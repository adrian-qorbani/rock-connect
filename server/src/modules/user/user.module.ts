import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
