import config from '#root/config.js';
import { MongoAdapter, CSVAdapter } from '#src/adapter.js';

const userCollectionName = config.mongo.collection.user;
const groupCollectionName = config.mongo.collection.group;
const groupUserCollectionName = config.mongo.collection.groupuser;
const csvFileName = config.csv;
const csvFields = ['Group Name', 'Username', 'Email'];

class SEBERepository {
  constructor() {
    this.mongoAdapter = new MongoAdapter();
    this.csvAdapter = new CSVAdapter();
  }

  async getSortedPrivateGroupsUsers() {
    try {
      await this.mongoAdapter.connect();
      const pipeline = [
        {
          $lookup: {
            from: 'groups',
            localField: 'groupId',
            foreignField: '_id',
            as: 'group',
          },
        },
        {
          $unwind: '$group',
        },
        {
          $project: { userId: 1, groupname: '$group.name', isPrivate: '$group.meta.isPrivate' },
        },
        {
          $match: {
            isPrivate: true,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },

        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [{ $month: '$user.createdAt' }, 11],
                },
                {
                  $eq: [{ $year: '$user.createdAt' }, 2021],
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 0,
            'Group Name': '$groupname',
            Username: '$user.username',
            Email: '$user.email',
          },
        },
        {
          $sort: { 'Group Name': 1, Username: 1 },
        },
      ];
      const result = await this.mongoAdapter.aggregate(groupUserCollectionName, pipeline);
      return result;
    } catch (e) {
      console.log('Error querying sorted private groups users');
      console.log(e);
    } finally {
      await this.mongoAdapter.close();
    }
  }

  async writePrivateGroupsUsersToCSV(users) {
    await this.csvAdapter.jsonToCSVFile(csvFileName, csvFields, users);
    return 'Success';
  }

  async getUsernames() {
    try {
      await this.mongoAdapter.connect();
      const pipeline = [{ $project: { _id: 1, username: 1 } }];
      const result = await this.mongoAdapter.aggregate(userCollectionName, pipeline);
      return result;
    } catch (e) {
      console.log('Error querying usrenames');
      console.log(e);
    } finally {
      await this.mongoAdapter.close();
    }
  }

  async updateUsernames(usernames) {
    try {
      await this.mongoAdapter.connect();
      for (const username of usernames) {
        await this.mongoAdapter.update(
          userCollectionName,
          { _id: username._id },
          { $set: { username: username.username } }
        );
      }
    } catch (e) {
      console.log('Error updating username');
      console.log(e);
    } finally {
      await this.mongoAdapter.close();
    }
  }

  capitalizeFirstLetterOfFieldInList(data, fieldName) {
    return data.map((d) => ({ ...d, [fieldName]: d[fieldName].charAt(0).toUpperCase() + d[fieldName].slice(1) }));
  }
}

export default SEBERepository;
