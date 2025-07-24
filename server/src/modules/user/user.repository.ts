import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUser(params: { where: Prisma.UserWhereUniqueInput }) {
    return this.prisma.user.findUnique(params);
  }

  async getAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
  }

  async getUserWithRelations(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user
      .findUnique({
        where,
        include: {
          posts: true,
          followers: true,
          following: true,
        },
      })
      .then((user) => {
        if (!user) return null;

        return {
          ...user,
          // TO-DO: not really optomized. might add another way later.
          postsCount: user.posts.length,
          followersCount: user.followers.length,
          followingCount: user.following.length,
        };
      });
  }

  async createUser(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return this.prisma.user.create({ data });
  }

  async deleteUser(params: { where: Prisma.UserWhereUniqueInput }) {
    return this.prisma.user.delete(params);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    return this.prisma.user.update(params);
  }

  async followUser(
    currentUserId: number,
    toBeFollowedUserId: number,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: currentUserId },
      data: {
        following: {
          connect: { id: toBeFollowedUserId },
        },
      },
    });
  }

  async unfollowUser(followerId: number, followingId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: followerId },
      data: {
        following: {
          disconnect: { id: followingId },
        },
      },
    });
  }

  async getRecentUsers(params: {
    limit: number;
    include?: Prisma.UserInclude;
  }): Promise<User[]> {
    return this.prisma.user
      .findMany({
        take: params.limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: params.include,
      })
  }
}
