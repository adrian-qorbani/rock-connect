import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}
}
