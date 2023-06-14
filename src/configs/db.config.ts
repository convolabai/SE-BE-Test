import * as Mongoose from 'mongoose'
import { config } from '@config/app.config'

const {
  mongo: { URI, USER, PASS },
} = config

export const connect = async (): Promise<void> => {
  try {
    console.info('Connecting to database ::', URI)
    await Mongoose.connect(URI, {
      authSource: 'admin',
      user: USER,
      pass: PASS,
    })
    console.info('Connected to database ::', URI)
  } catch (err) {
    console.error('Error connecting to database ::', err)
  }
}

export const disconnect = (): void => {
  Mongoose.disconnect()
  console.warn('Diconnected from database ::', URI)
}
