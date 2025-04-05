import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class GetFilterUserInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  @IsOptional()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  @IsOptional()
  name?: string;

  @Field(() => Date, { nullable: true })
  @IsString()
  @IsOptional()
  createdAtFrom?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  createdAtTo?: Date;
}
