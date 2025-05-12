import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { Like, Post, User } from '@prisma/client';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepository,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getLikesByPost(postId: number): Promise<Like[]> {
    return this.likeRepository.getLikes({
      where: { postId },
    });
  }

  async countLikesByPost(postId: number): Promise<number> {
    return this.likeRepository.countLike({
      where: { postId },
    });
  }

  // to-do: soft delete
  async addOrRemoveLike(
    postUuid: Post['uuid'],
    username: User['username'],
  ): Promise<Like> {
    const currentPost = await this.postRepository.getPost({
      where: { uuid: postUuid },
    });

    if (!currentPost) {
      throw new Error('Post not found');
    }

    const currentUser = await this.userRepository.getUser({
      where: { username: username },
    });

    if (!currentUser) {
      throw new Error('User not found');
    }

    const existingLike = await this.likeRepository.getLikes({
      where: { postId: currentPost.id, userId: currentUser.id },
    });

    if (existingLike.length) {
      const likeToDelete = existingLike[0];
      await this.likeRepository.deleteLike({
        where: { id: likeToDelete.id },
      });
      return likeToDelete;
    } else {
      return this.likeRepository.createLike({
        data: {
          post: { connect: { id: currentPost.id } },
          user: { connect: { id: currentUser.id } },
        },
      });
    }
  }
}
