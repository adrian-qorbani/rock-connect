import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @Field()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 35)
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  @Field()
  password: string;
}