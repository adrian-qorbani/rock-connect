import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';
import { Prisma, User } from '@prisma/client';
import { GetFilterUserInput } from './dto/get-filter-user.input';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async getUser(userInfo) {
    const user = await this.repository.getUser({ where: userInfo });
    return user;
  }

  async getUserWithRelations(userInfo) {
    const user = await this.repository.getUserWithRelations(userInfo);
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

  async followUser(
    currentUserUsername: string,
    toBeFollowedUsername: string,
  ): Promise<User> {
    const currentUser = await this.getUser({
      username: currentUserUsername,
    });

    const targetUser = await this.getUser({
      username: toBeFollowedUsername,
    });

    if (!currentUser || !targetUser) {
      throw new Error('User not found.');
    }

    if (currentUser.id === targetUser.id) {
      throw new Error('You cannot follow yourself.');
    }

    return this.repository.followUser(currentUser.id, targetUser.id);
  }

  async unfollowUser(
    currentUserUsername: string,
    toBeUnFollowedUsername: string,
  ): Promise<User> {
    const currentUser = await this.getUser({
      username: currentUserUsername,
    });

    const targetUser = await this.getUser({
      username: toBeUnFollowedUsername,
    });

    if (!currentUser || !targetUser) {
      throw new Error('User not found.');
    }

    if (currentUser.id === targetUser.id) {
      throw new Error('You cannot unfollow yourself.');
    }
    return this.repository.unfollowUser(currentUser.id, targetUser.id);
  }

  async getUsersWithFilters(filterInput: GetFilterUserInput) {
    const where: Prisma.UserWhereInput = {};

    if (filterInput.username) {
      where.username = { contains: filterInput.username, mode: 'insensitive' };
    }

    if (filterInput.name) {
      where.name = { contains: filterInput.name, mode: 'insensitive' };
    }

    if (filterInput.createdAtFrom || filterInput.createdAtTo) {
      where.createdAt = {
        ...(filterInput.createdAtFrom && { gte: filterInput.createdAtFrom }),
        ...(filterInput.createdAtTo && { lte: filterInput.createdAtTo }),
      };
    }
    try {
      return this.repository.getAllUsers({ where });
    } catch (e) {
      throw new NotFoundException('No matching users!');
    }
  }
}
