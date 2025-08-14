import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '../../src/domain/core/unique-entity-id';
import { User, UserProps } from '../../src/domain/entities/user';

type Props = Partial<UserProps>;

export function makeUser(override: Props = {}, id?: UniqueEntityID) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      ...override, 
    },
    id,
  );

  return user;
}