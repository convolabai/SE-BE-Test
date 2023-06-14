import GroupUser from '@model/group-user.model'
import Group from '@model/group.model'
import User, { IUserDocument } from '@model/user.model'
import { PipelineStage } from 'mongoose'

export interface IDateMeta {
  month: number
  year: number
  isPrivate: boolean
}

export function findByJoinedMonthYearAndGroupVisibility(monthYearMeta: IDateMeta): Promise<IUserDocument[]> {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: Group.collection.collectionName,
        localField: 'groupId',
        foreignField: '_id',
        as: 'group',
      },
    },
    {
      $unwind: '$group',
    },
    {
      $lookup: {
        from: User.collection.collectionName,
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        _id: 0,
        isPrivate: '$group.meta.isPrivate',
        userJoinedAt: '$createdAt',
        groupName: '$group.name',
        username: '$user.username',
        email: '$user.email',
      },
    },
    {
      $match: {
        isPrivate: monthYearMeta.isPrivate,
      },
    },
    {
      $match: {
        $expr: {
          $and: [
            {
              $eq: [{ $month: '$userJoinedAt' }, monthYearMeta.month],
            },
            {
              $eq: [{ $year: '$userJoinedAt' }, monthYearMeta.year],
            },
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
        groupName: '$groupName',
        username: '$username',
        email: '$email',
      },
    },
    {
      $sort: { groupName: 1, username: 1 },
    },
  ]
  return GroupUser.aggregate(pipeline).exec()
}
