import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { Media } from '@prisma/client';
import { User } from '../user/models/user.model';
import { MediaType } from './media.enum';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async getMedia() {
    return this.mediaRepository.getMedia({});
  }

  async createMedia(params: {
    url: Media['url'];
    type: MediaType;
    userId: User['id'];
    postId?: Media['postId'];
  }) {
    const { url, type, userId, postId } = params;

    if (type === MediaType.PROFILE_PICTURE && postId) {
      throw new Error('Profile pictures cannot be associated with posts');
    }

    if (type === MediaType.POST_PICTURE && !postId) {
      throw new Error('Post pictures must be associated with a post');
    }

    const media = await this.mediaRepository.createMedia({
      data: {
        url,
        type,
        user: {
          connect: {
            id: userId,
          },
        },
        ...(type === MediaType.POST_PICTURE &&
          postId && {
            post: {
              connect: {
                id: postId,
              },
            },
          }),
      },
    });
    return media;
  }
}
