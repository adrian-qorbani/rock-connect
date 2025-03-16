import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post, User } from '@prisma/client';
import { LikeService } from '../like/like.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private likeService: LikeService,
  ) {}

  async getPosts() {
    const posts = this.postRepository.getPosts({});
    return posts;
  }

  async createPost(params: {
    title: Post['title'];
    content: Post[`content`];
    username: User[`username`];
  }) {
    const { title, content, username } = params;

    const post = await this.postRepository.createPost({
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
    const updatedPost = await this.postRepository.updatePost({
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
    const deletedPost = await this.postRepository.deletePost({
      where: { id: postId },
    });

    return deletedPost;
  }

  async togglePostLike(params: {
    postUuid: Post['uuid'];
    username: User['username'];
  }) {
    console.log("init")
    const { postUuid, username } = params;
    console.log("init with:", `${postUuid} and ${username}`)
    const updatePostLike = await this.likeService.addOrRemoveLike(
      postUuid,
      username,
    );
    return updatePostLike;
  }
}
