import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment, Post, User } from '@prisma/client';
import { PostRepository } from '../post/post.repository';

@Injectable()
export class CommentService {
  constructor(
    private repository: CommentRepository,
    private postRepository: PostRepository,
  ) {}

  async getCommentsByPost(postUuid: Post['uuid']) {
    const comments = await this.repository.getComments({
      where: {
        uuid: postUuid,
      },
    });
    return comments;
  }

  async getComments(params: { postUuid?: string; userUuid?: string }) {
    const { postUuid, userUuid } = params;
    const where: any = {};

    if (postUuid) {
      where.post = { uuid: postUuid };
    }

    if (userUuid) {
      where.user = { uuid: userUuid };
    }

    const comments = await this.repository.getComments({
      where
    });

    return comments;
  }

  async createComment(params: {
    content: Comment[`content`];
    postUuid: Post['uuid'];
    username: User[`username`];
  }) {
    const { content, username, postUuid } = params;

    const currentPost = await this.postRepository.getPost({
      where: { uuid: postUuid },
    });

    if (!currentPost) {
      throw new Error('Post not found');
    }

    const comment = await this.repository.createComment({
      data: {
        content,
        user: {
          connect: {
            username: username,
          },
        },
        post: {
          connect: {
            id: currentPost.id,
          },
        },
      },
    });
    return comment;
  }
}
