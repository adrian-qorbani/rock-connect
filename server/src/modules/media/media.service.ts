import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }
    return { message: 'File uploaded successfully', filePath: file.path };
  }
}
