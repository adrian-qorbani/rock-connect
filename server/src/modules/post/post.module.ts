import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { LikeService } from '../like/like.service';
import { LikeRepository } from '../like/like.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [PrismaModule],
  providers: [PostService, PostRepository, PostResolver, LikeService, LikeRepository, UserRepository],
  exports: [PostService, PostRepository],
})
export class PostModule {}
