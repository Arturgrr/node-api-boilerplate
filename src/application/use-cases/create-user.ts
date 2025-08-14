import { Either, left, right } from '@/domain/core/either';
import { DomainEvents } from '@/domain/core/events/domain-events';
import { User } from '@/domain/entities/user';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { IPasswordHasher } from '../providers/IPasswordHasher';
import { IUsersRepository } from '../repositories/IUserRepository';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const passwordHash = await this.passwordHasher.hash(password);

    const user = User.create({
      name,
      email,
      passwordHash,
    });

    await this.usersRepository.create(user);
    
    DomainEvents.dispatchEventsForAggregate(user.id);

    return right({ user });
  }
}