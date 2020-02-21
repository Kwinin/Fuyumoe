import * as Redis from 'ioredis'
import * as config from 'config'
const redisConfig = config.get('redis')
export const redis = new Redis(redisConfig)
