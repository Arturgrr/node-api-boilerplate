import { ApplicationError } from '@/domain/errors/application-error';

export class UserNotFoundError extends ApplicationError {
  constructor(identifier: string) {
    super(`User with id "${identifier}" not found.`);
  }
}