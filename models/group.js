const GroupSchema = require('../schemas/group');
const mongoose = require('mongoose');

module.exports = mongoose.model('Group', GroupSchema);
