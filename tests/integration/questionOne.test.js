import config from '#root/config';
import SEBEUsecase from '#src/usecase';
import { initTestDb, cleanTestDb, findInTestDb } from '#tests-helpers/mongo';

const dbUri = config.mongo.URI;
const usecase = new SEBEUsecase();

describe('Given a list of users', () => {
  beforeAll(async () => {
    await cleanTestDb();
    await initTestDb();
  });

  describe('When a user is in a private group and is created in November 21', () => {
    it('Write a formatted list of users to csv', async () => {
      const expected = 'successful';
      const actual = usecase.questionOne();

      const collectionQuery = await findInTestDb('users', {});

      const content = expect(actual).toEqual(expected);
    });
  });
});
