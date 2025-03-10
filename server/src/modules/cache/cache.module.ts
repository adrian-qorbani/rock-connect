import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { CacheManagerService } from './cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get<string>('REDIS_HOST', 'localhost'), 
        port: configService.get<number>('REDIS_PORT', 6379), 
      }),
      inject: [ConfigService], 
    }),
  ],
  providers: [CacheManagerService], 
  exports: [CacheManagerService, CacheModule],
})
export class CacheManagerModule {}