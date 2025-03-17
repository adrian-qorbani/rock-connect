import { Logger as logger } from '@nestjs/common';
import {
  Catch,
  ConflictException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError): any {
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
        break;
    }
    return exception;
  }
}
