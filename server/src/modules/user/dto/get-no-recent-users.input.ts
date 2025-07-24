import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class GetNoOfRecentUsers {
  @Field(() => Int, { nullable: true, defaultValue: 6 })
  @IsNumber()
  @IsOptional()
  limit: number;
}
