import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsString()
  @IsNotEmpty()
  @Length(6, 40)
  @Field()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  @Field()
  postUuid: string;
}
