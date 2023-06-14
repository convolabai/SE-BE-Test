import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const config = {
  mongo: {
    URI: process.env.MONGO_URI || '',
    USER: process.env.MONGO_USER || '',
    PASS: process.env.MONGO_PASS || '',
  },
}
