import { DomainEvent } from '../core/events/domain-event';
import { UniqueEntityID } from '../core/unique-entity-id';
import { User } from '../entities/user';

export class UserCreatedEvent implements DomainEvent {
  public ocurredAt: Date;
  public user: User;

  constructor(user: User) {
    this.user = user;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}