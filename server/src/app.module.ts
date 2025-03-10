import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
import { CommonModule } from './common/common.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { CacheManagerModule } from './modules/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheManagerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CommonModule,
    PostModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
