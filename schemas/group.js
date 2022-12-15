import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  meta: {
    isPrivate: { type: Boolean, default: false },
  },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'deleted'],
  },
  updatedAt: { type: Date, default: new Date() },
});

export default GroupSchema;
