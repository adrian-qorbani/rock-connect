import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { AuthInput } from './dto/auth.input';
import { IsPublic } from 'src/common/decorator/public.decorator';

@IsPublic()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('authInput') authInput: AuthInput) {
    const user = await this.authService.validateUser(
      authInput.username,
      authInput.password,
    );

    if (!user) {
      throw new Error('User doesnt exist');
    }
    return this.authService.login(user);
  }
}
