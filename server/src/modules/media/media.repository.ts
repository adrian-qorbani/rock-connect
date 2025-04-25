import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Media, Prisma } from '@prisma/client';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMedia(params: { data: Prisma.MediaCreateInput }): Promise<Media> {
    const { data } = params;
    return this.prisma.media.create({
      data,
      include: {
        user: true,
        post: true,
      },
    });
  }

  async getMedia(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MediaWhereUniqueInput;
    where?: Prisma.MediaWhereInput;
    orderBy?: Prisma.MediaOrderByWithRelationInput;
    include?: Prisma.MediaInclude;
  }): Promise<Media[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.media.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: include || {
        user: true,
        post: true,
      },
    });
  }

  async getMediaById(params: {
    where: Prisma.MediaWhereUniqueInput;
    include?: Prisma.MediaInclude;
  }): Promise<Media | null> {
    const { where, include } = params;
    return this.prisma.media.findUnique({
      where,
      include: include || {
        user: true,
        post: true,
      },
    });
  }

  async updateMedia(params: {
    where: Prisma.MediaWhereUniqueInput;
    data: Prisma.MediaUpdateInput;
    include?: Prisma.MediaInclude;
  }): Promise<Media> {
    const { where, data, include } = params;
    return this.prisma.media.update({
      where,
      data,
      include: include || {
        user: true,
        post: true,
      },
    });
  }

  async deleteMedia(params: {
    where: Prisma.MediaWhereUniqueInput;
    include?: Prisma.MediaInclude;
  }): Promise<Media> {
    const { where, include } = params;
    return this.prisma.media.delete({
      where,
      include: include || {
        user: true,
        post: true,
      },
    });
  }

  async countMedia(params: {
    where?: Prisma.MediaWhereInput;
  }): Promise<number> {
    const { where } = params;
    return this.prisma.media.count({ where });
  }

  async getUserProfilePicture(params: {
    userId: number;
  }): Promise<Media | null> {
    const { userId } = params;
    return this.prisma.media.findFirst({
      where: {
        userId,
        type: 'PROFILE_PICTURE',
      },
      include: {
        user: true,
      },
    });
  }

  async getPostMedia(params: { postId: number }): Promise<Media[]> {
    const { postId } = params;
    return this.prisma.media.findMany({
      where: {
        postId,
        type: 'POST_PICTURE',
      },
      include: {
        post: true,
      },
    });
  }
}
