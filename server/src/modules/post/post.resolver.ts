import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { IsPublic } from 'src/common/decorator/public.decorator';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { Post } from 'src/modules/post/models/post.model';
import { PostService } from 'src/modules/post/post.service';
import { CreatePostInput } from './dto/create-post.input';
import { GetToggleLikePostInput } from './dto/get-toggle-like-post.input';
import { LikeModel } from '../like/models/like.model';
import { GetFilteredPostsInput } from './dto/get-filter-posts.input';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async getPosts() {
    return this.postService.getPosts();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.createPost({
      title: createPostInput.title,
      content: createPostInput.content,
      username: user.username,
    });
  }

  @Mutation(() => LikeModel)
  async togglePostLike(
    @Args('getToggleLikePostInput') getToggleLikePostInput: GetToggleLikePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.togglePostLike({
      postUuid: getToggleLikePostInput.postUuid,
      username: user.username
    })
  }

  @Query(() => [Post])
  async filterPosts(
    @Args("getFilteredPostsInput") getFilteredPostsInput: GetFilteredPostsInput 
  ) {
    return this.postService.getFilteredPosts(getFilteredPostsInput)
  }
}
