import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class GetCommentsByInput {
  @IsUUID()
  @Field({ nullable: true })
  postUuid: string;

  @IsUUID()
  @Field({ nullable: true })
  userUuid: string;
}
