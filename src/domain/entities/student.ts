
import { Entity } from '../core/entity';
import { UniqueEntityID } from '../core/unique-entity-id';
import { Optional } from '../types/optional';

export interface StudentProps {
  userId: UniqueEntityID;
  enrollmentDate: Date;
}

/**
 * @description Student representa o papel de um aluno no domínio.
 * Contém informações e regras de negócio pertinentes apenas a um estudante.
 * É um Aggregate Root e está ligado a um User por meio do userId.
 */
export class Student extends Entity<StudentProps> {
  get userId() { return this.props.userId; }
  get enrollmentDate() { return this.props.enrollmentDate; }

  private constructor(props: StudentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: Optional<StudentProps, 'enrollmentDate'>,
    id?: UniqueEntityID,
  ) {
    const student = new Student(
      {
        ...props,
        enrollmentDate: props.enrollmentDate ?? new Date(),
      },
      id,
    );
    return student;
  }
}