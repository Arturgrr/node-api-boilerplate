import { UniqueEntityID } from '@/domain/core/unique-entity-id';
import { User } from '@/domain/entities/user';
import { User as PrismaUser } from '@/generated/prisma';

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        passwordHash: raw.password,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );
  }


  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: new Date(),
    };
  }
}