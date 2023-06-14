import { Schema } from 'mongoose'

const GroupUserSchema = new Schema({
  createdAt: { type: Date, default: new Date() },
  groupId: { type: Schema.Types.ObjectId, required: true },
  updatedAt: { type: Date, default: new Date() },
  userId: { type: Schema.Types.ObjectId, required: true },
})

export default GroupUserSchema
