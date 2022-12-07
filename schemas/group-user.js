const { Schema, model } = require('mongoose');

const GroupUserSchema = new Schema({
  createdAt: { type: Date, default: new Date() },
  groupId: { type: Schema.ObjectId, required: true, ref: "Group" },
  updatedAt: { type: Date, default: new Date() },
  userId: { type: Schema.ObjectId, required: true, ref: "User" },
});

module.exports = model('GroupUser', GroupUserSchema)


