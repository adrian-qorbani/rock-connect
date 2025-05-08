import { Injectable } from '@nestjs/common';
import { MinioClientService } from '../minio/minio.service';
import { BufferedFile } from '../minio/model/file.model';

@Injectable()
export class FileManagerService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadImage(image: BufferedFile) {
    const uploaded_image = await this.minioClientService.upload(image);
    return {
      image_url: uploaded_image.url,
      message: 'Image upload successful',
    };
  }
}
