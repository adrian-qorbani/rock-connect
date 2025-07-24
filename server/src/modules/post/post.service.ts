import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Post, Prisma, User } from '@prisma/client';
import { LikeService } from '../like/like.service';
import { GetFilterUserInput } from '../user/dto/get-filter-user.input';
import { GetFilteredPostsInput } from './dto/get-filter-posts.input';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private likeService: LikeService,
    private prisma: PrismaService,
  ) {}

  async getPosts() {
    const posts = this.postRepository.getPosts({});
    return posts;
  }

  async getSinglePost(params: { uuid: Post['uuid'] }) {
  const { uuid } = params;
  return this.postRepository.getPost({
    where: { uuid }
  });
}

  async getFollowingUsersPosts(params: { username: User['username'] }) {
    const { username } = params;
    return this.postRepository.getFollowingUsersPosts(username);
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
    const { postUuid, username } = params;
    const updatePostLike = await this.likeService.addOrRemoveLike(
      postUuid,
      username,
    );
    return updatePostLike;
  }

  async getFilteredPosts(filterPostInput: GetFilteredPostsInput) {
    const where: Prisma.PostWhereInput = {};

    if (filterPostInput.title) {
      where.title = { contains: filterPostInput.title, mode: 'insensitive' };
    }

    if (filterPostInput.createdAtFrom || filterPostInput.createdAtTo) {
      where.createdAt = {
        ...(filterPostInput.createdAtFrom && {
          gte: filterPostInput.createdAtFrom,
        }),
        ...(filterPostInput.createdAtTo && {
          lte: filterPostInput.createdAtTo,
        }),
      };
    }
    try {
      return this.postRepository.getPosts({ where });
    } catch (e) {
      throw new NotFoundException('No matching posts');
    }
  }
}
