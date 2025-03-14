import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment, Post, User } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private repository: CommentRepository) {}

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
      where,
    });

    return comments;
  }

  async createComment(params: {
    content: Comment[`content`];
    postId: Post['id'];
    username: User[`username`];
  }) {
    const { content, username, postId } = params;

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
            id: postId,
          },
        },
      },
    });
    return comment;
  }
}
