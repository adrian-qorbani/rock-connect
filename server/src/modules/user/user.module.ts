import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [PrismaModule],
  providers: [PostRepository],
})
export class UserModule {}
