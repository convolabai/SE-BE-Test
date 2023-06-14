import GroupUser from '@model/group-user.model'
import Group from '@model/group.model'
import User from '@model/user.model'
import { EGroupStatus } from '@type/group.type'

const groups = [
  {
    name: 'Group1',
    status: EGroupStatus.Active,
    meta: {
      isPrivate: true,
    },
    createdAt: new Date('2020-11-01'),
  },
  {
    name: 'Group2',
    status: EGroupStatus.Deleted,
    meta: {
      isPrivate: true,
    },
    createdAt: new Date('2020-10-01'),
  },
  {
    name: 'Group3',
    status: EGroupStatus.Active,
    meta: {
      isPrivate: false,
    },
    createdAt: new Date('2020-09-01'),
  },
]

const users = [
  {
    email: 'user01@mail.com',
    username: 'user01',
  },
  {
    email: 'user02@mail.com',
    username: 'user02',
  },
  {
    email: 'user03@mail.com',
    username: 'user03',
  },
  {
    email: 'user04@mail.com',
    username: 'user04',
  },
  {
    email: 'user05@mail.com',
    username: 'user05',
  },
  {
    email: 'user06@mail.com',
    username: 'user06',
  },
  {
    email: 'user07@mail.com',
    username: 'user07',
  },
  {
    email: 'user08@mail.com',
    username: 'user08',
  },
  {
    email: 'user09@mail.com',
    username: 'user09',
  },
  {
    email: 'user10@mail.com',
    username: 'user10',
  },
  {
    email: 'user11@mail.com',
    username: 'user11',
  },
  {
    email: 'user12@mail.com',
    username: 'user12',
  },
]

async function create(model: any, dataArray: any[]) {
  const existingData = await model.find().exec()
  if (existingData.length !== 0) return []
  const createPromises = []
  for (const data of dataArray) {
    createPromises.push(model.create(data))
  }
  return await Promise.all(createPromises)
}

export default async function seed() {
  try {
    const results = await Promise.all([create(Group, groups), create(User, users)])
    const gResult = results[0]
    const uResult = results[1]
    // console.info('Group results ::', gResult)
    // console.info('User results ::', uResult)
    const groupUsers = []
    while (uResult.length) {
      const user = uResult.shift()
      if (uResult.length > 8) {
        groupUsers.push({
          groupId: gResult[0]._id,
          userId: user._id,
          createdAt: new Date('2021-11-01'),
        })
      } else if (uResult.length > 4) {
        groupUsers.push({
          groupId: gResult[1]._id,
          userId: user._id,
          createdAt: new Date('2022-10-01'),
        })
      } else {
        groupUsers.push({
          groupId: gResult[2]._id,
          userId: user._id,
        })
      }
    }
    const guResult = await create(GroupUser, groupUsers)
    // console.info('GroupUser results ::', guResult)
  } catch (err) {
    console.error(err)
  }
}
