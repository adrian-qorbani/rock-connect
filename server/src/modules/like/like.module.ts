import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [PrismaModule],
  providers: [LikeService, LikeRepository, PostRepository, UserRepository],
  exports: [LikeService],
})
export class LikeModule {}
