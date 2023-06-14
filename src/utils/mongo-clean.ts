import { connect, disconnect } from '@config/db.config'
import { dropAll } from './dropper'
;(async function () {
  await connect()
  await dropAll()
  disconnect()
})()
