import { IUsersRepository } from "../../src/application/repositories/IUserRepository";
import { DomainEvents } from "../../src/domain/core/events/domain-events";
import { User } from "../../src/domain/entities/user";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user ?? null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async create(user: User): Promise<void> {
    this.users.push(user);

    DomainEvents.dispatchEventsForAggregate(user.id);

  }
}