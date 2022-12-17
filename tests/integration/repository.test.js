import config from '#root/config';
import SEBERepository from '#src/repository';
import { initTestDb, cleanTestDb } from '#tests-helpers/mongo';
import { isFileExists, readCSV, deleteFileIfExists } from '#tests-helpers/filesystem';
import { formattedUsers } from '#output/formattedUsers';

const csvFileName = config.csv;
const repository = new SEBERepository();

describe('Given a list of users that are associated with groups', () => {
  describe('When a user is in a private group and is created in November 2021', () => {
    beforeAll(async () => {
      await cleanTestDb();
      await initTestDb();
    });

    afterAll(async () => {
      await cleanTestDb();
    });

    it('Returns a filtered list of users sorted asc by group name then username', async () => {
      const expected = formattedUsers;
      const actual = await repository.getSortedPrivateGroupsUsers();

      expect(actual).toEqual(expected);
    });
  });

  describe('When users had been filtered and sorted', () => {
    const processedUsers = formattedUsers;

    describe('When the users list is written to csv file', () => {
      beforeEach(() => {
        deleteFileIfExists(csvFileName);
      });

      afterEach(() => {
        deleteFileIfExists(csvFileName);
      });

      it('Write status is successful', async () => {
        const expected = 'Success';
        const actual = await repository.writePrivateGroupsUsersToCSV(processedUsers);

        expect(actual).toEqual(expected);
      });

      it('User list csv file is created', async () => {
        const expected = true;

        const status = await repository.writePrivateGroupsUsersToCSV(processedUsers);
        const actual = isFileExists(csvFileName);

        expect(actual).toEqual(expected);
      });

      it('User list csv file content is correct', async () => {
        const expected = formattedUsers;

        const status = await repository.writePrivateGroupsUsersToCSV(processedUsers);
        const actual = await readCSV(csvFileName);

        expect(actual).toEqual(expected);
      });
    });
  });
});
