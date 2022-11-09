const UserSchema = require('../schemas/user');
const mongoose = require('mongoose');

module.exports = mongoose.model('User', UserSchema);
