import { MongoClient } from 'mongodb';
import config from '#root/config';

const testDbUri = config.mongo.URI;
const testDbName = config.mongo.db;

class MongoAdapter {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async connect() {
    this.client = await MongoClient.connect(testDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db(testDbName);
    return this.connection;
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
  }

  async find(collection, query, options) {
    const queryResult = await this.db.collection(collection).find(query, options).toArray();
    return queryResult;
  }

  async aggregate(collection, pipeline, query) {
    const aggregateResult = await this.db.collection(collection).aggregate(pipeline).toArray();
    return aggregateResult;
  }

  write(query) {
    return;
  }
}

class CSVAdapter {
  write(content) {
    return 'successful';
  }
}

export { MongoAdapter, CSVAdapter };
