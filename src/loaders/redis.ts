import { Redis } from 'ioredis';
import config from '../config/index';
import logger from '../middleware/logger';

const host = config.redisHost || 'localhost';

export const redis = new Redis(6379, host);

redis.on('connect', () => {
    logger.info('Connected to Redis');
});
