import config from '#root/config';
import SEBEUsecase from '#src/usecase';
import { initTestDb, cleanTestDb, aggregateDataInDb } from '#tests-helpers/mongo';
import { isFileExists, readCSV, deleteFileIfExists } from '#tests-helpers/filesystem';
import { formattedUsers } from '#output/formattedUsers';
import { capitalizedUsernames } from '#output/capitalizedUsernames';

const csvFileName = config.csv;
const userCollectionName = config.mongo.collection.user;
const usecase = new SEBEUsecase();

describe('Given a list of users that are associated with groups', () => {
  describe('When a user is in a private group and is created in November 2021', () => {
    describe('When the filtered user list is written to a csv file', () => {
      beforeAll(async () => {
        await cleanTestDb();
        await initTestDb();
        deleteFileIfExists(csvFileName);
      });

      afterAll(async () => {
        await cleanTestDb();
        deleteFileIfExists(csvFileName);
      });

      it('Returns success status', async () => {
        const expected = 'Success';
        const actual = await usecase.questionOne();

        expect(actual).toEqual(expected);
      });

      it('The file exists', async () => {
        const expected = true;

        const status = await usecase.questionOne();
        const actual = isFileExists(csvFileName);

        expect(actual).toEqual(expected);
      });

      it('The file content is correct', async () => {
        const expected = formattedUsers;

        const status = await usecase.questionOne();
        const actual = await readCSV(csvFileName);

        expect(actual).toEqual(expected);
      });
    });
  });
});

describe('Given a list of users', () => {
  const usernameFieldName = 'username';

  beforeEach(async () => {
    await cleanTestDb();
    await initTestDb();
  });

  afterEach(async () => {
    await cleanTestDb();
  });
  describe('When usernames are capitalized and are saved to the database', () => {
    it('Usernames inside the database are capitalized', async () => {
      const expected = capitalizedUsernames;

      await usecase.questionTwo();
      const actual = await aggregateDataInDb(userCollectionName, [{ $project: { _id: 1, username: 1 } }]);

      expect(actual).toEqual(expected);
    });
  });
});
