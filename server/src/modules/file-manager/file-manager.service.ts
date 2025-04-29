import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import { InjectMinio } from 'nestjs-minio';

@Injectable()
export class FileManagerService {
  protected _bucketName = 'media';

  constructor(@InjectMinio() private readonly minioService: Minio.Client) {}

  async bucketsList() {
    console.log("list goes:")
    return await this.minioService.listBuckets();
  }

  async getFile(filename: string) {
    return await this.minioService.presignedUrl(
      'GET',
      this._bucketName,
      filename,
    );
  }

  uploadFile(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const filename = `${randomUUID().toString()}-${file.originalname}`;
      this.minioService.putObject(
        this._bucketName,
        filename,
        file.buffer,
        file.size,
        (error, objInfo) => {
          if (error) {
            reject(error);
          } else {
            resolve(objInfo);
          }
        },
      );
    });
  }
}
