import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OnUserCreated } from '../../src/application/subscribers/on-user-created';
import { CreateUserUseCase } from '../../src/application/use-cases/create-user';
import { FakeLoggerProvider } from '../providers/fake-logger-provider';
import { FakePasswordHasher } from '../providers/fake-password-hasher';
import { InMemoryNotificationProvider } from '../providers/in-memory-notification-provider';
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let notificationProvider: InMemoryNotificationProvider;
let createUserUseCase: CreateUserUseCase;
let logger: FakeLoggerProvider;

describe('On User Created Subscriber', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    notificationProvider = new InMemoryNotificationProvider();
    logger = new FakeLoggerProvider();
    
    createUserUseCase = new CreateUserUseCase(usersRepository, passwordHasher);

    new OnUserCreated(notificationProvider, logger);
  });

  it('should send a welcome notification when a user is created', async () => {
    const sendNotificationSpy = vi.spyOn(notificationProvider, 'send');

    await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(sendNotificationSpy).toHaveBeenCalled();
    expect(notificationProvider.notifications).toHaveLength(1);
    expect(notificationProvider.notifications[0].title).toContain('Bem-vindo(a)');
  });
});