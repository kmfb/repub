class CacheUtil {
  cacheName: string;

  constructor(cacheName: string) {
    this.cacheName = cacheName;
  }

  async create(key: string, data: Response): Promise<void> {
    const cache = await caches.open(this.cacheName);
    cache.put(key, data);
  }

  async read(key: string): Promise<Response | undefined> {
    const cache = await caches.open(this.cacheName);
    return cache.match(`/${key}`);
  }

  async update(key: string, data: Response): Promise<void> {
    return this.create(key, data);
  }

  async delete(key: string): Promise<void> {
    const cache = await caches.open(this.cacheName);
    cache.delete(key);
  }

  async keys(): Promise<any> {
    const cache = await caches.open(this.cacheName);
    const keys = await cache.keys();
    return keys;
  }
}

export const repubCache = new CacheUtil("repub-book");
