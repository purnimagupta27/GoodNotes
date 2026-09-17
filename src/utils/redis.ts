//we establish connect here...

import { Redis } from 'ioredis'
import 'dotenv/config'

const redisUrl = process.env.REDIS_URL!

const redis = new Redis(redisUrl)

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis