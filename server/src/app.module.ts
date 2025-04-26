import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { join } from 'path';
import { CommonModule } from './common/common.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { CacheManagerModule } from './modules/cache/cache.module';
import { AuthModule } from './modules/auth/auth.module';
import config from './common/config/config'
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards/jwt-auth.guard';
import { JwtStrategy } from './modules/auth/strategy/jwt.strategy';
import { LikeModule } from './modules/like/like.module';
import { CommentModule } from './modules/comment/comment.module';
import { MediaModule } from './modules/media/media.module';
import { UploadModule } from './modules/upload/upload.module';
import { MinioModule } from './modules/minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    CacheManagerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // context: ({ req, res }) => ({ req, res }),
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CommonModule,
    PostModule,
    UserModule,
    AuthModule,
    LikeModule,
    CommentModule,
    MediaModule,
    UploadModule,
    MinioModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    },
    JwtStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
