import { beforeEach, describe, expect, it } from 'vitest';
import { GetUserDataUseCase } from '../../src/application/use-cases/get-user-data';
import { makeUser } from '../factories/make-user';
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserDataUseCase;

describe('Get User Data Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserDataUseCase(usersRepository);
  });

  it('should be able to get user data', async () => {
    const newUser = makeUser();
    await usersRepository.create(newUser);

    const result = await sut.execute({
      userId: newUser.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.user).toEqual(
        expect.objectContaining({
          name: newUser.name,
          email: newUser.email,
        }),
      );
    }
  });

  it('should not be able to get data from a non-existing user', async () => {
    const result = await sut.execute({
      userId: 'non-existing-user-id',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(Error);
  });
});
