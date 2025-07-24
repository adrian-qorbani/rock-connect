import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  async getComments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { user: true },
    });
  }

  async createComment(params: {
    data: Prisma.CommentCreateInput;
  }): Promise<Comment> {
    const { data } = params;
    return this.prisma.comment.create({ data });
  }

  async updateComment(params: {
    where: Prisma.CommentWhereUniqueInput;
    data: Prisma.CommentUpdateInput;
  }) {
    return this.prisma.comment.update(params);
  }

  async deleteComment(params: { where: Prisma.CommentWhereUniqueInput }) {
    return this.prisma.comment.delete(params);
  }
}
