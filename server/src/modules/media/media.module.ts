import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [PrismaModule]
})
export class MediaModule {}
