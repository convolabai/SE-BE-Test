import { MongoClient } from 'mongodb';
import config from '#root/config';
import { userTestCollection } from '#input/user';
import { groupTestCollection } from '#input/group';
import { groupUserTestCollection } from '#input/group-user';

const testDbUri = config.mongo.URI;
const testDbName = config.mongo.db;
const userCollectionName = config.mongo.collection.user;
const groupCollectionName = config.mongo.collection.group;
const groupUserCollectionName = config.mongo.collection.groupuser;

const connectionWrapper = async (callback) => {
  let client = null;
  let db = null;
  try {
    client = await MongoClient.connect(testDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db(testDbName);
    const result = await callback(db);
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    if (client) {
      await client.close();
    }
  }
};

const aggregateDataInDb = async (collectionName, pipeline) =>
  await connectionWrapper(async (db) => db.collection(collectionName).aggregate(pipeline).toArray());

const initTestDb = async () => {
  await connectionWrapper(async (db) => {
    await db.createCollection(userCollectionName);
    await db.collection(userCollectionName).insertMany(userTestCollection);

    await db.createCollection(groupCollectionName);
    await db.collection(groupCollectionName).insertMany(groupTestCollection);

    await db.createCollection(groupUserCollectionName);
    await db.collection(groupUserCollectionName).insertMany(groupUserTestCollection);
  });
};

const cleanTestDb = async () => {
  await connectionWrapper(async (db) => {
    await db
      .collection(userCollectionName)
      .drop()
      .catch((e) => {
        console.log('User collection had not yet been created');
      });
    await db
      .collection(groupCollectionName)
      .drop()
      .catch((e) => {
        console.log('Group collection had not yet been created');
      });
    await db
      .collection(groupUserCollectionName)
      .drop()
      .catch((e) => {
        console.log('GroupUser collection had not yet been created');
      });
  });
};

export { initTestDb, cleanTestDb, aggregateDataInDb };
