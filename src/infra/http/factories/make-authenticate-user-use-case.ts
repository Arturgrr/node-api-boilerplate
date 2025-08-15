import { AuthenticateUserUseCase } from '@/application/use-cases/authenticate-user';
import { PrismaUsersRepository } from '@/infra/database/repositories/PrismaUserRepository';
import { BcryptPasswordHasher } from '@/infra/providers/BcryptPasswordHasher';

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const passwordHasher = new BcryptPasswordHasher();
  const useCase = new AuthenticateUserUseCase(usersRepository, passwordHasher);

  return useCase;
}