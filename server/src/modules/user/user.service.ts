import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUser(userInfo) {
    const user = await this.repository.getUser(userInfo);
    return user;
  }

  async getUsers() {
    const users = await this.repository.getAllUsers({});
    return users;
  }

  async editUser(params: { userId: number; username?: string }) {
    const { userId, ...rest } = params;
    const updatedUser = await this.repository.updateUser({
      where: { id: userId },
      data: {
        // to-do ...
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  }

  async deleteUser(params: { userId: number }) {
    const { userId } = params;
    const deletedUser = await this.repository.deleteUser({
      where: { id: userId },
    });

    return deletedUser;
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    const user = await this.repository.createUser({
      data: {
        ...createUserInput,
        password: hashedPassword,
      },
    });

    return user;
  }
}
