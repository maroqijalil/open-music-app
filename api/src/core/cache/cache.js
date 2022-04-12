import redis from 'redis';

class Cache {
  constructor(host) {
    this.client = redis.createClient({socket: {host}});

    this.client.on('error', (error) => {
      console.error(error);
    });

    this.client.connect();
  }

  async set(key, value, expirationInSecond = 1800) {
    await this.client.set(key, value, {EX: expirationInSecond});
  }

  async get(key) {
    return await this.client.get(key);
  }

  delete(key) {
    return this.client.del(key);
  }
}

const initCache = () => {
  return new Cache(process.env.REDIS_SERVER);
};

export default initCache;
