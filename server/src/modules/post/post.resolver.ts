import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/modules/post/models/post.model';
import { PostService } from 'src/modules/post/post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async getPosts() {
    return this.postService.getPosts();
  }

  @Mutation(() => Post)
  async createPost(
    @Args({ name: `title`, type: () => String }) title: string,
    @Args({ name: `content`, type: () => String }) content: string,
    @Args({ name: `userId`, type: () => Int }) userId: number,
  ) {
    return this.postService.createPost({ title, content, userId });
  }
}