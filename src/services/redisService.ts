import { redis } from '../loaders/redis';

class RedisService {
    async setValue(key: string, value: string): Promise<'OK'> {
        return redis.set(key, value);
    }

    async getValue(key: string): Promise<string | null> {
        return redis.get(key);
    }
}

export default new RedisService();
