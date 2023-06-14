import GroupUser from '@model/group-user.model'
import Group from '@model/group.model'
import User from '@model/user.model'

async function drop(model: any): Promise<void> {
  const data = await model.find().exec()
  if (data.length !== 0) {
    await model.collection.drop()
  }
}

export async function dropAll(): Promise<void> {
  try {
    await Promise.all([drop(User), drop(Group), drop(GroupUser)])
  } catch {}
}
