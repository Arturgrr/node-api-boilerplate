import { CreateUserUseCase } from '@/application/use-cases/create-user';
import { PrismaUsersRepository } from '@/infra/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from '@/infra/providers/BcryptPasswordHasher';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const passwordHasher = new BcryptPasswordHasher();
  const useCase = new CreateUserUseCase(usersRepository, passwordHasher);

  return useCase;
}