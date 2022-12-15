import * as dotenv from 'dotenv';

dotenv.config();

export default {
  mongo: {
    URI: process.env.MONGO_URI || 'mongodb://SEBEApp:1234@localhost:27017/test',
    collection: {
      user: process.env.MONGO_USER_COLLECTION || 'user',
      group: process.env.MONGO_GROUP_COLLECTION || 'group',
      groupUser: process.env.MONGO_GROUPUSER_COLLECTION || 'groupUser',
    },
  },
};
