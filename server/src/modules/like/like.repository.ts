import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Like } from '@prisma/client';

@Injectable()
export class LikeRepository {
  constructor(private prisma: PrismaService) {}

  async getLikes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LikeWhereUniqueInput;
    where?: Prisma.LikeWhereInput;
    orderBy?: Prisma.LikeOrderByWithRelationInput;
  }): Promise<Like[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.like.findMany({ skip, take, cursor, where, orderBy });
  }

  async createLike(params: { data: Prisma.LikeCreateInput }): Promise<Like> {
    const { data } = params;
    return this.prisma.like.create({ data });
  }

  async deleteLike(params: { where: Prisma.LikeWhereUniqueInput }) {
    return this.prisma.like.delete(params);
  }

  async countLike(params: { where: Prisma.LikeWhereInput }): Promise<number> {
    const { where } = params;
    return this.prisma.like.count({ where });
  }
}
