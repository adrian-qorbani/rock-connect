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

@IsPublic()
@Controller('files')
export class FileManagerController {
  constructor(readonly service: FileManagerService) {}

  @Get('buckets')
  bucketsList() {
    return this.service.bucketsList();
  }

  @Get('media/:name')
  getFile(@Param('name') name: string) {
    return this.service.getFile(name);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile('file') file: Express.Multer.File) {
    return this.service.uploadFile(file);
  }
}
