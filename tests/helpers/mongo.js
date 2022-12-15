import mongoose, { connect } from 'mongoose';
import config from '#root/config';
import UserSchema from '#schemas/user';
import GroupSchema from '#schemas/group';
import GroupUserSchema from '#schemas/group-user';
import { userTestCollection } from '#tests-data/input/user';
import { groupTestCollection } from '#tests-data/input/group';
import { groupUserTestCollection } from '#tests-data/input/group-user';

const testDbUri = config.mongo.URI;

const connectionWrapper = async (callback) => {
  try {
    const db = await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    const result = await callback(db.connection);
    await db.connection.close();
    return result;
  } catch (e) {
    console.log(e);
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
    await connection.dropCollection('users').catch((e, r) => {
      console.log(`User collection doesn't exist`);
    });
    await connection.dropCollection('groups').catch((e, r) => {
      console.log(`Group collection doesn't exist`);
    });
    await connection.dropCollection('groups').catch((e, r) => {
      console.log(`Group collection doesn't exist`);
    });
  });
};

const findInTestDb = async (collectionName, query) =>
  connectionWrapper(async (connection) => {
    const collection = connection.collection(collectionName);
    return collection.find(query).toArray();
  });

export { initTestDb, cleanTestDb, findInTestDb };
