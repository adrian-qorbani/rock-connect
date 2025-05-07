import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length, IsEmail, IsOptional } from 'class-validator';

@InputType()
export class EditUserInput {
  @IsString()
  @IsOptional()
  @Length(5, 20)
  @Field({ nullable: true })
  username?: string;

  @IsEmail()
  @IsOptional()
  @Length(5, 35)
  @Field({ nullable: true })
  email?: string;

  @IsString()
  @IsOptional()
  @Length(5, 20)
  @Field({ nullable: true })
  password?: string;

  @IsString()
  @IsOptional()
  @Length(0, 120)
  @Field({ nullable: true })
  bio?: string;

  @IsString()
  @IsOptional()
  @Length(0, 120)
  @Field({ nullable: true })
  profilePicture?: string;
}
