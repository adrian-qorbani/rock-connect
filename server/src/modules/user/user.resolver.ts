import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { IsPublic } from 'src/common/decorator/public.decorator';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { GetFollowerInput } from './dto/get-follower.input';
import { GetFilterUserInput } from './dto/get-filter-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getCurrentUser(@CurrentUser() user: User) {
    return this.userService.getUserWithRelations({ username: user.username });
  }

  @Query(() => User)
  async getUser(@Args({ name: `id`, type: () => Int }) userId: number) {
    return this.userService.getUser({ userId });
  }

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @IsPublic()
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.createUser(createUserInput);
  }

  @Mutation(() => User)
  async followUser(
    @Args('getFollowerInput') getFollowerInput: GetFollowerInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.followUser(
      user.username,
      getFollowerInput.username,
    );
  }

  @Mutation(() => User)
  async unfollowUser(
    @Args('getFollowerInput') getFollowerInput: GetFollowerInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.unfollowUser(
      user.username,
      getFollowerInput.username,
    );
  }

  @Query(() => [User])
  async filterUsers(
    @Args('getFilterUserInput') getFilterUserInput: GetFilterUserInput,
  ) {
    return this.userService.getUsersWithFilters(getFilterUserInput)
  }
}
