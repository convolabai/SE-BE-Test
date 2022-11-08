const { build, perBuild, oneOf } = require('@jackfranklin/test-data-bot');
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const generateMongoDbId = () => new mongoose.Types.ObjectId();

const userBuilder = build('User', {
  fields: {
    _id: perBuild(() => generateMongoDbId()),
    username: perBuild(() => faker.internet.userName().toLowerCase()),
    email: perBuild(() => faker.internet.email()),
    createdAt: perBuild(() => new Date()),
    updatedAt: perBuild(() => new Date()),
  },
});

const groupBuilder = build('Group', {
  fields: {
    _id: perBuild(() => generateMongoDbId()),
    name: perBuild(() => faker.word.noun()),
    meta: {
      isPrivate: false,
    },
    status: oneOf('active', 'deleted'),
    createdAt: perBuild(() => new Date()),
    updatedAt: perBuild(() => new Date()),
  },
  traits: {
    private: {
      overrides: {
        meta: { isPrivate: true },
      },
    },
  },
});

module.exports = {
  userBuilder,
  groupBuilder,
};
