import * as dotenv from 'dotenv';

dotenv.config();

export default {
  mongo: {
    URI: process.env.MONGO_URI || 'mongodb://SEBEApp:1234@localhost:27017/test',
    db: process.env.MONGO_TEST_DB || 'test',
    collection: {
      user: process.env.MONGO_USER_COLLECTION || 'users',
      group: process.env.MONGO_GROUP_COLLECTION || 'groups',
      groupuser: process.env.MONGO_GROUPUSER_COLLECTION || 'groupusers',
    },
  },
};
