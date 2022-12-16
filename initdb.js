import mongoose from 'mongoose';
import config from './config.js';
import UserSchema from './schemas/user.js';
import GroupSchema from './schemas/group.js';
import GroupUserSchema from './schemas/group-user.js';
import { userTestCollection } from './tests/data/input/user.old.js';
import { groupTestCollection } from './tests/data/input/group.old.js';
import { groupUserTestCollection } from './tests/data/input/group-user.old.js';

const testDbUri = config.mongo.URI;

console.log(`Connecting to database ${testDbUri}...`);
const db = await mongoose.connect(testDbUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
console.log(`Successfully connected to ${testDbUri}\n`);

console.log('Cleaning User collection...');
await db.connection.dropCollection('users').catch((e, r) => {
  console.log(`User collection doesn't exist`);
});
console.log('User collection is now empty\n');

console.log('Cleaning Group collection...');
await db.connection.dropCollection('groups').catch((e, r) => {
  console.log(`Group collection doesn't exist`);
});
console.log('Group collection is now empty\n');

console.log('Cleaning GroupUser collection...');
await db.connection.dropCollection('groupusers').catch((e, r) => {
  console.log(`GroupUser collection doesn't exist`);
});
console.log('GroupUser collection is now empty\n');

console.log('Adding User data...');
const User = mongoose.model('User', UserSchema);
await User.insertMany(userTestCollection);
console.log('Successfully add User data\n');

console.log('Adding Group data...');
const Group = mongoose.model('Group', GroupSchema);
await Group.insertMany(groupTestCollection);
console.log('Successfully add Group data\n');

console.log('Adding GroupUser data...');
const GroupUser = mongoose.model('GroupUser', GroupUserSchema);
await GroupUser.insertMany(groupUserTestCollection);
console.log('Successfully add GroupUser data\n');

console.log('Ending database connection...');
await db.connection.close();
console.log('Connection ended.\n');
