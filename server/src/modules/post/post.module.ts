import { Module } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostRepository],
})
export class PostModule {}
