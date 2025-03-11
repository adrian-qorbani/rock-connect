import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post, User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private repository: PostRepository) {}

  async getPosts() {
    const posts = this.repository.getPosts({});
    return posts;
  }

  async createPost(params: {
    title: Post['title'];
    content: Post[`content`];
    username: User[`username`];
  }) {
    const { title, content, username } = params;

    const post = await this.repository.createPost({
      data: {
        title,
        content,
        user: {
          connect: {
            username: username,
          },
        },
      },
    });
    return post;
  }

  async editPost(params: { postId: number; title?: string; content?: string }) {
    const { postId, content, title } = params;
    const updatedPost = await this.repository.updatePost({
      where: { id: postId },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return updatedPost;
  }

  async deletePost(params: { postId: number }) {
    const { postId } = params;
    const deletedPost = await this.repository.deletePost({
      where: { id: postId },
    });

    return deletedPost
  }
}
