import mongoose from 'mongoose';

const GroupUserSchema = new mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  groupId: { type: mongoose.Schema.ObjectId, required: true },
  updatedAt: { type: Date, default: new Date() },
  userId: { type: mongoose.Schema.ObjectId, required: true },
});

export default GroupUserSchema;
