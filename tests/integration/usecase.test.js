import config from '#root/config';
import SEBEUsecase from '#src/usecase';
import { initTestDb, cleanTestDb } from '#tests-helpers/mongo';
import { isFileExists, readCSV, deleteFileIfExists } from '#tests-helpers/filesystem';
import { formattedUsers } from '#output/formattedUsers';

const csvFileName = config.csv;
const usecase = new SEBEUsecase();

describe('Given a list of users that are associated with groups', () => {
  describe('When a user is in a private group and is created in November 2021', () => {
    beforeAll(async () => {
      await cleanTestDb();
      await initTestDb();
      deleteFileIfExists(csvFileName);
    });

    afterAll(async () => {
      await cleanTestDb();
      deleteFileIfExists(csvFileName);
    });

    it('User list is written to a csv file with success status', async () => {
      const expected = 'Success';
      const actual = await usecase.questionOne();

      expect(actual).toEqual(expected);
    });

    it('User list is written to a csv file and the file exists', async () => {
      const expected = true;

      const status = await usecase.questionOne();
      const actual = isFileExists(csvFileName);

      expect(actual).toEqual(expected);
    });

    it('User list is written to a csv file and the file content is correct', async () => {
      const expected = formattedUsers;

      const status = await usecase.questionOne();
      const actual = await readCSV(csvFileName);

      expect(actual).toEqual(expected);
    });
  });
});
