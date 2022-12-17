import config from '#root/config';
import SEBERepository from '#src/repository';
import { initTestDb, cleanTestDb, aggregateDataInDb } from '#tests-helpers/mongo';
import { isFileExists, readCSV, deleteFileIfExists } from '#tests-helpers/filesystem';
import { uncapitalizedUsernames } from '#input/uncapitalizedUsernames';
import { formattedUsers } from '#output/formattedUsers';
import { capitalizedUsernames } from '#output/capitalizedUsernames';

const csvFileName = config.csv;
const userCollectionName = config.mongo.collection.user;
const repository = new SEBERepository();

describe('Given a list of users that are associated with groups', () => {
  describe('When a user in a private group and is created in November 2021', () => {
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
      describe('When the filtered user list is written to a csv file', () => {
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

  describe('Getting a list of users from the database', () => {
    it('Return a list of username and user id', async () => {
      const expected = uncapitalizedUsernames;
      const actual = await repository.getUsernames();

      expect(actual).toEqual(expected);
    });
  });

  describe('Capitalizing the first letter of all usernames', () => {
    it('Returns a list of capitalized usernames', async () => {
      const expected = capitalizedUsernames;
      const actual = repository.capitalizeFirstLetterOfFieldInList(uncapitalizedUsernames, usernameFieldName);

      expect(actual).toEqual(expected);
    });
  });

  describe('Updating username in mongodb', () => {
    it('Usernames are capitalized in the database', async () => {
      const expected = capitalizedUsernames;

      const updatedUsernames = repository.capitalizeFirstLetterOfFieldInList(uncapitalizedUsernames, usernameFieldName);
      await repository.updateUsernames(updatedUsernames);

      const actual = await aggregateDataInDb(userCollectionName, [{ $project: { _id: 1, username: 1 } }]);

      expect(actual).toEqual(expected);
    });
  });
});
