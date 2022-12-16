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
      const result = await this.mongoAdapter.find(userCollectionName, {}, null);
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
