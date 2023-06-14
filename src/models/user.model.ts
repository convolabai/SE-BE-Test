import { Model, model } from 'mongoose'
import UserSchema from '@schema/user.schema'
import { IDateMeta } from '@static/user.static'
import { IUser } from '@type/user.type'

export interface IUserDocument extends IUser, Document {
  capitalizedUsername(this: IUserDocument): string
}

interface IUserModel extends Model<IUserDocument> {
  findByJoinedMonthYearAndGroupVisibility(monthYear: IDateMeta): Promise<IUserDocument[]>
}

const User = model<IUserDocument, IUserModel>('User', UserSchema)

export default User
