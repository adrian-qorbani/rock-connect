import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

@InputType()
export class GetCommentsByInput {
  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  postUuid?: string;

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  userUuid?: string;
}
