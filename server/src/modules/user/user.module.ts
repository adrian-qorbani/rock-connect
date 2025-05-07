import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { FileManagerService } from '../file-manager/file-manager.service';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository, UserResolver, UserService, FileManagerService],
  exports: [UserService, UserRepository]
})
export class UserModule {}
