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
    userId: User[`id`];
  }) {
    const { title, content, userId } = params;

    const post = await this.repository.createPost({
      data: {
        title,
        content,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return post;
  }
}
