import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Post as PostDB, User as UserDB } from '@prisma/client';
import { Post } from 'src/modules/post/models/post.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id: UserDB[`id`];

  @Field(() => String)
  uuid: UserDB[`uuid`];

  @Field(() => String)
  username: UserDB[`username`];

  @Field(() => GraphQLISODateTime)
  createdAt: UserDB[`createdAt`];

  @Field(() => GraphQLISODateTime)
  updatedAt: UserDB[`updatedAt`];

  @Field(() => String)
  password: UserDB[`password`];

  @Field(() => String, { nullable: true })
  bio: UserDB[`bio`];

  @Field(() => String, { nullable: true })
  profilePicture: UserDB[`profilePicture`];

  @Field(() => [Post], { nullable: true })
  posts?: PostDB[];

  @Field(() => [User], { nullable: true })
  followers?: User[];

  @Field(() => [User], { nullable: true })
  following?: User[];

  @Field(() => Int)
  postsCount?: number;

  @Field(() => Int)
  followersCount?: number;

  @Field(() => Int)
  followingCount?: number;
}
