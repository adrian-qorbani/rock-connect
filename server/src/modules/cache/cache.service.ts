import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheManagerService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setKey(key: string, value: string, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async getKey(key: string): Promise<string | null> {
    return await this.cacheManager.get(key);
  }

  async deleteKey(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}