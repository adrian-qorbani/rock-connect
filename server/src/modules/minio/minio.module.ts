import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './minio.service';

@Global()
@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.getOrThrow('MINIO_ENDPOINT'),
        port: parseInt(configService.getOrThrow('MINIO_PORT')),
        useSSL: false,
        accessKey: configService.getOrThrow('MINIO_ACCESS_KEY'),
        secretKey: configService.getOrThrow('MINIO_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
