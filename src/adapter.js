import mongoose from 'mongoose';
import config from '#root/config';

const testDbUri = config.mongo.URI;

class MongoAdapter {
  async connect() {
    const db = await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    return db.connection;
  }

  async close(connection) {
    connection.close();
  }

  async find(connection, collectionName, query) {
    const collection = connection.collection(collectionName);
    return collection.find(query).toObject();
  }

  async aggregate(connection, collectionName, query) {
    const collection = connection.collection(collectionName);
    return collection.aggregate(query).toArray();
  }

  write(query) {
    return 'successful';
  }
}

class CSVAdapter {
  write(content) {
    return 'successful';
  }
}

export { MongoAdapter, CSVAdapter };
