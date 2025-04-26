// src/minio/minio.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly minioClient: Minio.Client,
  ) {
    this.bucketName =
      this.configService.get<string>('minio.bucketName') || 'media';
  }

  async onModuleInit() {
    try {
      const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      if (!bucketExists) {
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');

        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${this.bucketName}/*`],
            },
          ],
        };

        await this.minioClient.setBucketPolicy(
          this.bucketName,
          JSON.stringify(policy),
        );
      }
    } catch (error) {
      console.error('MinIO initialization error:', error);
      throw error;
    }
  }

  async uploadFile(file: Express.Multer.File, fileName: string) {
    try {
      await this.minioClient.putObject(
        this.bucketName,
        fileName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );

      return {
        url: `${this.configService.get('minio.endPoint')}:${this.configService.get('minio.port')}/${this.bucketName}/${fileName}`,
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async deleteFile(fileName: string) {
    try {
      await this.minioClient.removeObject(this.bucketName, fileName);
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
}
