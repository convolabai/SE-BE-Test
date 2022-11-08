const GroupUserSchema = require('../schemas/group-user');
const mongoose = require('mongoose');

module.exports = mongoose.model('GroupUser', GroupUserSchema);
