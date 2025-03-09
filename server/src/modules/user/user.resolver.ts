import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getUser(@Args({ name: `id`, type: () => Int }) userId: number) {
    return this.userService.getUser({ userId });
  }

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @Mutation(() => User)
  async editUser(
    @Args({ name: `id`, type: () => Int }) userId: number,
    @Args({ name: `username`, type: () => String, nullable: true })
    username?: string,
  ) {
    return this.userService.editUser({ userId, username });
  }

  @Mutation(() => User)
  async deleteUser(@Args({ name: `userId`, type: () => Int }) userId: number) {
    return this.userService.deleteUser({ userId });
  }
}
