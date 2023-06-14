import { Model, model } from 'mongoose'
import GroupUserSchema from '@schema/group-user.schema'
import { IGroupUser } from '@type/group-user.type'

export interface IGroupUserDocument extends IGroupUser, Document {}

interface IGroupUserModel extends Model<IGroupUserDocument> {}

const GroupUser = model<IGroupUser, IGroupUserModel>('GroupUser', GroupUserSchema)

export default GroupUser
