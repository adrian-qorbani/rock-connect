import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { MinioService } from './minio.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'MINIO',
      useFactory: (configService: ConfigService) => {
        return new Minio.Client({
          // @ts-ignore
          endPoint: configService.get<string>('minio.endPoint'),
          port: configService.get<number>('minio.port'),
          useSSL: configService.get<boolean>('minio.useSSL'),
          accessKey: configService.get<string>('minio.accessKey'),
          secretKey: configService.get<string>('minio.secretKey'),
        });
      },
      inject: [ConfigService],
    },
    MinioService,
  ],
  exports: [MinioService],
})
export class MinioModule {}