import { AggregateRoot } from '../core/aggregate-root';
import { UniqueEntityID } from '../core/unique-entity-id';
import { UserCreatedEvent } from '../events/user-created-event';
import { Optional } from '../types/optional';

export interface UserProps {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

/**
 * @description User representa a identidade e o meio de autenticação no sistema.
 * É um Aggregate Root focado exclusivamente em quem o usuário é, não no que ele faz.
 */
export class User extends AggregateRoot<UserProps> {
  get name() { return this.props.name; }
  get email() { return this.props.email; }
  get passwordHash() { return this.props.passwordHash; }
  get createdAt() { return this.props.createdAt; }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: Optional<UserProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    
    if (!id) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }

    return user;
  }
}