import { MongoAdapter, CSVAdapter } from '#src/adapter';
import { formatPrivateGroupsUsers } from '#src/formatter';

class SEBERepository {
  constructor() {
    this.mongoAdapter = new MongoAdapter();
    this.csvAdapter = new CSVAdapter();
  }

  getSortedPrivateGroupsUsers() {
    this.mongoAdapter.connect();
    const query = {};
    const result = this.mongoAdapter.read(query);
    this.mongoAdapter.close();
    return result;
  }

  capitalizeUserFirstNames() {
    this.mongoAdapter.connect();
    const query = {};
    const result = this.mongoAdapter.write(query);
    this.mongoAdapter.close();
    return result;
  }

  writePrivateGroupsUsersToCSV(uesrs) {
    const formattedUsers = formatPrivateGroupsUsers(users);
    const status = this.csvAdapter.write(formattedUsers);
    return status;
  }
}

export default SEBERepository;
