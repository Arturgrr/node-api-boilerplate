import { ApplicationError } from '@/domain/errors/application-error';

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
    super('Invalid credentials.');
  }
}