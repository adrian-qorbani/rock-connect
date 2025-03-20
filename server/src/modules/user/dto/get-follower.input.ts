import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

@InputType()
export class GetFollowerInput {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @Field()
  username: string;
}