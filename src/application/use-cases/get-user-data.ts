import { UserNotFoundError } from '@/application/errors/user-not-found-error';
import { Either, left, right } from '@/domain/core/either';
import { User } from '@/domain/entities/user';
import { IUsersRepository } from '../repositories/IUserRepository';

interface GetUserDataUseCaseRequest {
  userId: string;
}

type GetUserDataUseCaseResponse = Either<
  UserNotFoundError,
  {
    user: User;
  }
>;

export class GetUserDataUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
  }: GetUserDataUseCaseRequest): Promise<GetUserDataUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      return left(new UserNotFoundError(userId));
    }

    return right({ user });
  }
}