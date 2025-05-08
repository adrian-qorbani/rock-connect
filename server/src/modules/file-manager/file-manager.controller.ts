import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/common/decorator/public.decorator';
import { BufferedFile } from '../minio/model/file.model';

@IsPublic()
@Controller('file-manager')
export class FileManagerController {
  constructor(private fileManagerService: FileManagerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image: BufferedFile) {
    return await this.fileManagerService.uploadImage(image);
  }
}
