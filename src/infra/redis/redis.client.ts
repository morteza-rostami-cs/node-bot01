import { config } from '@/config';
import Redis from 'ioredis';
import { logger } from '../logging/Logger';

class RedisClient {
  protected client: Redis;

  constructor() {
    // get dotenv variables
    const redisHost = config.redis.host;
    const redisPort = config.redis.port;
    const redisPassword = config.redis.password;

    if (!redisHost || !redisPort || !redisPassword) throw new Error('Redis variables missing');

    // setup redis client
    this.client = new Redis({
      host: redisHost,
      port: redisPort,
      password: redisPassword,
    });

    // on redis error
    this.client.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });

    this.client.on('connect', () => {
      logger.info('success connecting to redis');
    });
  }

  // redis methods

  // set redis
  public async set({
    key,
    value,
    ttlSeconds,
  }: {
    key: string;
    value: any;
    ttlSeconds?: number;
  }): Promise<void> {
    // json string
    const serialized = JSON.stringify(value);

    // with expiration date
    if (ttlSeconds) {
      await this.client.set(key, serialized, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, serialized);
    }
  }

  // get from redis
  public async get<T = any>({ key }: { key: string }): Promise<T | null> {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  // delete from redis
  public async del({ key }: { key: string }): Promise<number> {
    return this.client.del(key);
  }

  // set expiration for key -> after creation (for some reason)
  public async expire({ key, ttlSeconds }: { key: string; ttlSeconds: number }): Promise<void> {
    await this.client.expire(key, ttlSeconds);
  }
}

// singleton
export const redisClient = new RedisClient();
export type { RedisClient };
