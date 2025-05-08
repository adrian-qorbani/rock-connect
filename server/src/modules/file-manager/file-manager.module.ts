import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manager.controller';
import { MinioClientModule } from '../minio/minio.module';

@Module({
  imports: [MinioClientModule],
  providers: [FileManagerService],
  controllers: [FileManagerController],
})
export class FileManagerModule {}
