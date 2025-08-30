import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OnUserCreated } from '../../src/application/subscribers/on-user-created';
import { CreateUserUseCase } from '../../src/application/use-cases/create-user';
import { FakeLoggerProvider } from '../providers/fake-logger-provider';
import { FakePasswordHasher } from '../providers/fake-password-hasher';
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let createUserUseCase: CreateUserUseCase;
let logger: FakeLoggerProvider;

describe('On User Created Subscriber', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    logger = new FakeLoggerProvider();
    
    createUserUseCase = new CreateUserUseCase(usersRepository, passwordHasher);

    new OnUserCreated(logger);
  });

  it('should log when a user is created', async () => {
    const logSpy = vi.spyOn(logger, 'log');

    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('[OnUserCreated]: Event received for user John Doe');
  });
});