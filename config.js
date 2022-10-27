require("dotenv").config();

module.exports = {
  mongo: {
    URI: process.env.MONGO_URI || "mongodb://localhost:27017/test",
  },
};
