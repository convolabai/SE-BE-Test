import config from '#root/config';
import { MongoAdapter, CSVAdapter } from '#src/adapter';
import { formatPrivateGroupsUsers } from '#src/formatter';

const userCollectionName = config.mongo.collection.user;
const groupCollectionName = config.mongo.collection.group;
const groupUserCollectionName = config.mongo.collection.groupuser;

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

  capitalizeUserFirstNames() {
    this.mongoAdapter.connect();
    const query = {};
    const result = this.mongoAdapter.write(query);
    this.mongoAdapter.close();
    return result;
  }

  writePrivateGroupsUsersToCSV(users) {
    const formattedUsers = formatPrivateGroupsUsers(users);
    const status = this.csvAdapter.write(formattedUsers);
    return status;
  }
}

export default SEBERepository;
