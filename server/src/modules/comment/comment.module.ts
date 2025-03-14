import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { CommentRepository } from './comment.repository';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [PrismaModule],
  providers: [CommentService, CommentResolver, CommentRepository, PostRepository],
})
export class CommentModule {}
