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

  async getFollowingUsersPosts(username: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        OR: [
          { user: { followers: { some: { username } } } },
          { user: { username } },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            uuid: true,
            username: true,
            profilePicture: true,
          },
        },
        media: true,
        likes: {
          include: {
            user: { select: { id: true, uuid: true, username: true } },
          },
        },
        comments: {
          include: {
            user: { select: { id: true, uuid: true, username: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((post) => ({
      ...post,
      // TO-DO: not really optomized. might add another way later.
      likesCount: post.likes?.length || 0, 
      commentsCount: post.comments?.length || 0, 
    }));
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
