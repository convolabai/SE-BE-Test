import { Schema } from 'mongoose'

export interface IGroupUser {
  createdAt: Date
  updatedAt: Date
  groupId: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId
}
