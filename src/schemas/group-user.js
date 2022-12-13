const { Schema } = require('mongoose');

const GroupUserSchema = new Schema({
  createdAt: { type: Date, default: new Date() },
  groupId: { type: Schema.ObjectId, required: true },
  updatedAt: { type: Date, default: new Date() },
  userId: { type: Schema.ObjectId, required: true },
});

module.exports = GroupUserSchema;
