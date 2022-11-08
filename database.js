let mongoose = require('mongoose');
const { mongo } = require('./config');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(mongo.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error');
      });
  }

  disconnect() {
    return mongoose.disconnect();
  }
}

module.exports = new Database();
