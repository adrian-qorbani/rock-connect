import { Injectable } from '@nestjs/common';
import { Prisma, Post } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  async getPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({ skip, take, cursor, where, orderBy });
  }

  async getFollowingUsersPosts(username) {
    return this.prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              username: username,
            },
          },
        },
      },
      include: {
        user: {
          select: {
            username: true
          }
        },
        media: true,
        likes: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPost(params: {
    where: Prisma.PostWhereInput;
  }): Promise<Post | null> {
    const { where } = params;
    return this.prisma.post.findFirst({ where });
  }

  async createPost(params: { data: Prisma.PostCreateInput }): Promise<Post> {
    const { data } = params;
    return this.prisma.post.create({ data });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }) {
    return this.prisma.post.update(params);
  }

  async deletePost(params: { where: Prisma.PostWhereUniqueInput }) {
    return this.prisma.post.delete(params);
  }
}
