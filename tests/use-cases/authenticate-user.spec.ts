import { beforeEach, describe, expect, it } from 'vitest';
import { InvalidCredentialsError } from '../../src/application/errors/invalid-credentials-error';
import { AuthenticateUserUseCase } from '../../src/application/use-cases/authenticate-user';
import { makeUser } from '../factories/make-user';
import { FakePasswordHasher } from '../providers/fake-password-hasher';
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new AuthenticateUserUseCase(usersRepository, passwordHasher);
  });

  it('should be able to authenticate a user', async () => {
    const createdUser = makeUser({
      passwordHash: await passwordHasher.hash('password123'), 
    });
    usersRepository.users.push(createdUser);

    const result = await sut.execute({
      email: createdUser.email,
      password: 'password123',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.user.email).toEqual(createdUser.email);
    }
  });

  it('should not be able to authenticate with a non-existent email', async () => {
    const result = await sut.execute({
      email: 'non.existent@example.com',
      password: 'password123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const createdUser = makeUser({
      passwordHash: await passwordHasher.hash('correct-password'),
    });
    usersRepository.users.push(createdUser);

    const result = await sut.execute({
      email: createdUser.email,
      password: 'wrong-password',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });
});