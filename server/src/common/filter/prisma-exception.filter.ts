import { Logger as logger } from '@nestjs/common';
import {
  Catch,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ValidationError } from 'class-validator';

@Catch(Prisma.PrismaClientKnownRequestError, ValidationError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError | ValidationError,
  ): any {
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handlePrismaError(exception);
    } else if (exception instanceof ValidationError) {
      return this.handleValidationError(exception);
    }
  }

  private handlePrismaError(exception: Prisma.PrismaClientKnownRequestError) {
    logger.error(
      `Prisma Error Code: ${exception.code}, Message: ${exception.message}`,
    );

    switch (exception.code) {
      case 'P2002': {
        const target = exception.meta?.target || 'field';
        throw new ConflictException(`The ${target} must be unique.`);
      }
      case 'P2003': {
        const field = exception.meta?.field_name || 'entity';
        throw new UnprocessableEntityException(`The ${field} doesn't exist.`);
      }
      case 'P2025': {
        const model = exception.meta?.model || 'record';
        throw new NotFoundException(`${model} not found.`);
      }
      default:
        throw new BadRequestException('An unexpected database error occurred.');
    }
  }

  private handleValidationError(exception: ValidationError) {
    logger.error(`Validation Error: ${exception.toString()}`);

    const errors = this.flattenValidationErrors(exception);
    throw new BadRequestException({
      statusCode: 400,
      message: 'Validation failed',
      errors,
    });
  }

  private flattenValidationErrors(error: ValidationError): string[] {
    const errors: string[] = []; 
    for (const constraint in error.constraints) {
      if (error.constraints.hasOwnProperty(constraint)) {
        errors.push(error.constraints[constraint]); 
      }
    }
    return errors;
  }
}
