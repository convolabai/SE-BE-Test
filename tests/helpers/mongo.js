import mongoose, { connect } from 'mongoose';
import config from '#root/config';
import UserSchema from '#schemas/user';
import GroupSchema from '#schemas/group';
import GroupUserSchema from '#schemas/group-user';
import { userTestCollection } from '#input/user.old';
import { groupTestCollection } from '#input/group.old';
import { groupUserTestCollection } from '#input/group-user.old';

const testDbUri = config.mongo.URI;

const connectionWrapper = async (callback) => {
  let connection = null;
  try {
    const connection = await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).connection;
    const result = await callback(connection);
    return result;
  } catch (e) {
    console.log(e);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
};

const initTestDb = async () => {
  await connectionWrapper(async (connection) => {
    const User = mongoose.model('User', UserSchema);
    await User.insertMany(userTestCollection);

    const Group = mongoose.model('Group', GroupSchema);
    await Group.insertMany(groupTestCollection);

    const GroupUser = mongoose.model('GroupUser', GroupUserSchema);
    await GroupUser.insertMany(groupUserTestCollection);
  });
};

const cleanTestDb = async () => {
  await connectionWrapper(async (connection) => {
    await connection.dropCollection('users').catch((e) => {
      console.log(`User collection doesn't exist`);
    });
    await connection.dropCollection('groups').catch((e) => {
      console.log(`Group collection doesn't exist`);
    });
    await connection.dropCollection('groupusers').catch((e) => {
      console.log(`GroupUser collection doesn't exist`);
    });
    await connection.dropDatabase().catch((e) => {
      console.log('Error deleting test database');
      console.log(e);
    });
  });
};

const findInTestDb = async (collectionName, query) =>
  connectionWrapper(async (connection) => {
    const collection = connection.collection(collectionName);
    return collection.find(query).toArray();
  });

export { initTestDb, cleanTestDb, findInTestDb };
