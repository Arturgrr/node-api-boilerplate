import { ApplicationError } from '@/domain/errors/application-error';

export class UserAlreadyExistsError extends ApplicationError {
  constructor(identifier: string) {
    super(`User with email "${identifier}" already exists.`);
  }
}