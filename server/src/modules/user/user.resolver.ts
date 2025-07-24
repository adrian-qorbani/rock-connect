import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { IsPublic } from 'src/common/decorator/public.decorator';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { GetFollowerInput } from './dto/get-follower.input';
import { GetFilterUserInput } from './dto/get-filter-user.input';
import { EditUserInput } from './dto/update-user.input';
import { GetNoOfRecentUsers } from './dto/get-no-recent-users.input';

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
  async editUser(
    @Args('editUserInput') editUserInput: EditUserInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.updateUser(user.username, editUserInput);
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
    return this.userService.getUsersWithFilters(getFilterUserInput);
  }

  @Query(() => [User])
  async getRecentUsers(
    @Args('numberOfRecentUsers') numberOfRecentUsers: GetNoOfRecentUsers,
  ) {
    return this.userService.getRecentUsers(numberOfRecentUsers);
  }
}
