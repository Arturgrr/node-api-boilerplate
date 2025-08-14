import { beforeEach, describe, expect, it } from 'vitest';
import { UserAlreadyExistsError } from '../../src/application/errors/user-already-exists-error';
import { CreateUserUseCase } from '../../src/application/use-cases/create-user';
import { makeUser } from '../factories/make-user';
import { FakePasswordHasher } from '../providers/fake-password-hasher';
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let passwordHasher: FakePasswordHasher;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordHasher = new FakePasswordHasher();
    sut = new CreateUserUseCase(usersRepository, passwordHasher);
  });

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(result.isRight()).toBe(true);
    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0].email).toEqual('john.doe@example.com');
  });

  it('should hash the user password upon creation', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0].passwordHash).toEqual('password123-hashed');
  });

  it('should not be able to create a user with an already existing email', async () => {
    const userWithSameEmail = makeUser({ email: 'john.doe@example.com' });
    usersRepository.users.push(userWithSameEmail);

    const result = await sut.execute({
      name: 'Another John',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});