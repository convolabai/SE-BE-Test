import { Schema } from 'mongoose'
import { EGroupStatus } from '@type/group.type'

const GroupSchema = new Schema({
  createdAt: { type: Date, default: new Date() },
  meta: {
    isPrivate: { type: Boolean, default: false },
  },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(EGroupStatus),
  },
  updatedAt: { type: Date, default: new Date() },
})

export default GroupSchema
