import { GetUserDataUseCase } from '@/application/use-cases/get-user-data';
import { PrismaUsersRepository } from '@/infra/database/repositories/PrismaUserRepository';

export function makeGetUserDataUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserDataUseCase(usersRepository);

  return useCase;
}