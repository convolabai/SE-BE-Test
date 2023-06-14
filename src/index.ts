import { outputFile } from 'fs-extra'
import { connect, disconnect } from '@config/db.config'
import User from '@model/user.model'
import parseCSV from '@util/csv-parser'
import seed from '@util/seeder'
import path from 'path'
import { dropAll } from '@util/dropper'
;(async function () {
  // Initialize
  await connect()
  await dropAll()
  await seed()

  // Solution 1
  const users = await User.findByJoinedMonthYearAndGroupVisibility({ month: 11, year: 2021, isPrivate: true })
  const solutionFilePath = path.join(__dirname, '../SOL1.csv').split(path.sep).join('/')
  await outputFile(solutionFilePath, parseCSV(users, ['Group Name', 'Username', 'Email']))
  console.log('SOL1 ::', solutionFilePath)

  // Solution 2
  const allUsers = await User.find().exec()
  console.log(
    'SOL2 :: Before ::',
    allUsers.map((u) => ({
      username: u.username,
    })),
  )
  const updatePromises = []
  for (let user of allUsers) {
    user.username = user.capitalizedUsername()
    updatePromises.push(user.save())
  }
  await Promise.all(updatePromises)
  const updatedUsers = await User.find().sort({ username: 1 }).exec()
  console.log(
    'SOL2 :: After ::',
    updatedUsers.map((u) => ({
      username: u.username,
    })),
  )

  disconnect()
})()
