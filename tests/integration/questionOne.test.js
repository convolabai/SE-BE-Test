import config from '#root/config';
import SEBEUsecase from '#src/usecase';
import { initTestDb, cleanTestDb } from '#tests-helpers/mongo';
import { userTestCollection } from '#input/user';
import { formattedUsers } from '#output/formattedUsers';

const dbUri = config.mongo.URI;
const usecase = new SEBEUsecase();

describe('Given a list of users', () => {
  let connection = null;
  beforeAll(async () => {
    await cleanTestDb();
    await initTestDb();
  });

  describe('When a user is in a private group and is created in November 21', () => {
    it('Write a formatted list of users to csv', async () => {
      // const expected = formattedUsers;
      const expected = userTestCollection;
      const actual = await usecase.questionOne();

      expect(actual).toEqual(expected);
    });
  });
});
