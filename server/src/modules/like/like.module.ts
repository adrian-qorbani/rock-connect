import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LikeService, LikeRepository],
  exports: [LikeService],
})
export class LikeModule {}
