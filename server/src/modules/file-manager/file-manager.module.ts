import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manager.controller';
import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [MinioModule],
  providers: [FileManagerService],
  controllers: [FileManagerController]
})
export class FileManagerModule {}
