import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [PrismaModule],
  providers: [PostService, PostRepository, PostResolver],
  exports: [PostService],
})
export class PostModule {}
