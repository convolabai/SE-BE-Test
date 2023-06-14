import { Model, model } from 'mongoose'
import GroupSchema from '@schema/group.schema'
import { IGroup } from '@type/group.type'

export interface IGroupDocument extends IGroup, Document {}

interface IGroupModel extends Model<IGroupDocument> {}

const Group = model<IGroupDocument, IGroupModel>('Group', GroupSchema)

export default Group
