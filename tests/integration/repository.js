import config from '#root/config';
import SEBEUsecase from '#src/usecase';
import { initTestDb, cleanTestDb } from '#tests-helpers/mongo';
import { userTestCollection } from '#input/user';
import { formattedUsers } from '#output/formattedUsers';

const dbUri = config.mongo.URI;
const csvFileName = config.csv;
const usecase = new SEBEUsecase();

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
      const actual = await usecase.questionOne();

      expect(actual).toEqual(expected);
    });
  });

  describe('When users had been filtered and sorted', () => {
    it('List is written to csv file', () => {});
  });
});
