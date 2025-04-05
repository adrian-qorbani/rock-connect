import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class GetFilteredPostsInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @IsOptional()
  title?: string;

  @Field(() => Date, { nullable: true })
  @IsString()
  @IsOptional()
  createdAtFrom?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAtTo?: Date;
}
