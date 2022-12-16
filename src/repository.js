import { MongoAdapter, CSVAdapter } from '#src/adapter';
import { formatPrivateGroupsUsers } from '#src/formatter';

class SEBERepository {
  constructor() {
    this.mongoAdapter = new MongoAdapter();
    this.csvAdapter = new CSVAdapter();
  }

  async getSortedPrivateGroupsUsers() {
    let connection = null;
    try {
      connection = await this.mongoAdapter.connect();
      const query = {};
      const result = await this.mongoAdapter.find(connection, 'users', query);
      return result;
    } catch (e) {
      console.log('Error querying sorted private groups users');
      console.log(e);
    } finally {
      if (connection) {
        await this.mongoAdapter.close(connection);
      }
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
