require('./database');

const mongoose = require('mongoose');
const User = require('./models/user');
const Group = require('./models/group');
const GroupUser = require('./models/group-user');
const { userBuilder, groupBuilder, getDateInNovember2021 } = require('./mocks');

// Users will be splitted equally into public and private groups
const mockUsers = Array.from({ length: 100 }, () => userBuilder());
const [mockUsersInPublicGroup, mockUsersInPrivateGroup] = [
  mockUsers.slice(0, 50),
  mockUsers.slice(50),
];
const mockPublicGroups = Array.from({ length: 10 }, () => groupBuilder());
const mockPrivateGroups = Array.from({ length: 10 }, () =>
  groupBuilder({ traits: 'private' })
);

// Records of user who join pivate group recently
const mockRecentPrivateGroupUsers = mockUsersInPrivateGroup
  .slice(0, 25)
  .map(({ _id: userId }) => {
    return {
      groupId: random(mockPrivateGroups)._id,
      userId,
    };
  });

// Records of user who join pivate groups in November 2021
const mockNovPrivateGroupUsers = mockUsersInPrivateGroup
  .slice(25)
  .map(({ _id: userId }) => {
    return {
      groupId: random(mockPrivateGroups)._id,
      userId,
      createdAt: getDateInNovember2021(),
    };
  });

const mockPrivateGroupUsers = [
  ...mockRecentPrivateGroupUsers,
  ...mockNovPrivateGroupUsers,
];
const mockPublicGroupUsers = mockUsersInPublicGroup.map(({ _id: userId }) => {
  return {
    groupId: random(mockPublicGroups)._id,
    userId,
  };
});

/**
 * Random one item from the given array
 * @param {any[]} items
 */
function random(items) {
  if (items.length === 0) {
    throw new Error('Cannot random because the given `items` is empty');
  }
  return items[Math.floor(Math.random() * items.length)];
}

async function seed() {
  // Delete existing records
  await Promise.all([
    User.deleteMany(),
    Group.deleteMany(),
    GroupUser.deleteMany(),
  ]);

  await Promise.all([
    User.insertMany(mockUsers),
    Group.insertMany([...mockPrivateGroups, ...mockPublicGroups]),
    GroupUser.insertMany([...mockPrivateGroupUsers, ...mockPublicGroupUsers]),
  ]);

  await mongoose.disconnect();

  console.log('Database has been seeded');
  console.log('Disconnected from the database');
}

seed();
