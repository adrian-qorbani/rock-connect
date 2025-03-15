import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { Like } from '@prisma/client';

@Injectable()
export class LikeService {
  constructor(private repository: LikeRepository) {}

  async getLikesByPost(postId: number): Promise<Like[]> {
    return this.repository.getLikes({
      where: { postId },
    });
  }

  async countLikesByPost(postId: number): Promise<number> {
    return this.repository.countLike({
      where: { postId },
    });
  }

  async addOrRemoveLike(postId: number, userId: number): Promise<Like | null> {
    const existingLike = await this.repository.getLikes({
      where: { postId, userId },
    });

    if (existingLike.length) {
      await this.repository.deleteLike({
        where: { id: existingLike[0].id },
      });
      return null;
    } else {
      return this.repository.createLike({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
        },
      });
    }
  }
}
