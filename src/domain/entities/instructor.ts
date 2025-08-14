import { Entity } from '../core/entity';
import { UniqueEntityID } from '../core/unique-entity-id';
import { Optional } from '../types/optional';

export interface InstructorProps {
  userId: UniqueEntityID;
  bio: string;
  specialties: string[];
}

/**
 * @description Instructor representa o papel de um professor no domínio.
 * É um Aggregate Root e está ligado a um User por meio do userId.
 */
export class Instructor extends Entity<InstructorProps> {
  get userId() { return this.props.userId; }
  get bio() { return this.props.bio; }
  get specialties() { return this.props.specialties; }

  private constructor(props: InstructorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: Optional<InstructorProps, 'specialties'>,
    id?: UniqueEntityID,
  ) {
    const instructor = new Instructor(
      {
        ...props,
        specialties: props.specialties ?? [],
      },
      id,
    );
    return instructor;
  }
}