import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { IsPublic } from 'src/common/decorator/public.decorator';
import { CurrentUser } from 'src/common/decorator/user.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async getCurrentUser(@CurrentUser() user: User) {
    return this.userService.getUser({ username: user.username });
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
}
