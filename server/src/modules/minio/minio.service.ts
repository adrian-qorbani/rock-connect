import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioClient, MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './model/file.model';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioService');

    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: [
            's3:ListBucketMultipartUploads',
            's3:GetBucketLocation',
            's3:ListBucket',
          ],
          Resource: [`arn:aws:s3:::${process.env.MINIO_BUCKETNAME || 'media'}`],
        },
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*'],
          },
          Action: [
            's3:PutObject',
            's3:AbortMultipartUpload',
            's3:DeleteObject',
            's3:GetObject',
            's3:ListMultipartUploadParts',
          ],
          Resource: ['arn:aws:s3:::media/*'],
        },
      ],
    };
    try {
      this.client.setBucketPolicy(
        process.env.MINIO_BUCKETNAME || 'media',
        JSON.stringify(policy),
      );
      console.log("bucket policy set.")
    } catch (err) {
      this.logger.error('Error setting bucket policy', err);
    }
  }
  private readonly logger: Logger;
  private readonly bucketName = process.env.MINIO_BUCKETNAME || 'media';

  public get client(): MinioClient {
    return this.minio.client;
  }

  public async upload(
    file: BufferedFile,
    bucketName: string = this.bucketName,
  ) {
    console.log('uploading ....');
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException(
        'File type not supported',
        HttpStatus.BAD_REQUEST,
      );
    }
    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };

    const fileName = hashedFileName + extension;

    try {
      await this.client.putObject(
        bucketName,
        fileName,
        file.buffer,
        file.buffer.length,
        metaData,
      );

      return {
        url: `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKETNAME}/${fileName}`,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(objectName: string, bucketName: string = this.bucketName) {
    try {
      await this.client.removeObject(bucketName, objectName);
    } catch (err) {
      throw new HttpException(
        'An error occurred when deleting!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
