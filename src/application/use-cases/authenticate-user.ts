import { Either, left, right } from '@/domain/core/either';
import { User } from '@/domain/entities/user';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { IPasswordHasher } from '../providers/IPasswordHasher';
import { IUsersRepository } from '../repositories/IUserRepository';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    user: User;
  }
>;

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      return left(new InvalidCredentialsError());
    }
    
    return right({ user });
  }
}