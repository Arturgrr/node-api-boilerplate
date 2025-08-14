import { ApplicationError } from '@/domain/errors/application-error';

export class UnauthorizedError extends ApplicationError {
  constructor(message: string = 'Authentication token is invalid.') {
    super(message);
  }
}