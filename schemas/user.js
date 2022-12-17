import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  createdAt: { type: Date, default: new Date() },
  email: { type: String, lowercase: true, trim: true },
  updatedAt: { type: Date, default: new Date() },
  username: { type: String, required: true },
});

export default UserSchema;
