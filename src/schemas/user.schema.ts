import { Schema } from 'mongoose'
import { findByJoinedMonthYearAndGroupVisibility } from '@static/user.static'
import { capitalizedUsername } from '@method/user.method'

const UserSchema = new Schema({
  createdAt: { type: Date, default: new Date() },
  email: { type: String, lowercase: true, trim: true },
  updatedAt: { type: Date, default: new Date() },
  username: { type: String, required: true },
})

UserSchema.statics.findByJoinedMonthYearAndGroupVisibility = findByJoinedMonthYearAndGroupVisibility

UserSchema.method('capitalizedUsername', capitalizedUsername)

export default UserSchema
