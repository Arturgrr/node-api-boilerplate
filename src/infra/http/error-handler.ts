import { InvalidCredentialsError } from "@/application/errors/invalid-credentials-error";
import { UnauthorizedError } from "@/application/errors/unauthorized-error";
import { UserAlreadyExistsError } from "@/application/errors/user-already-exists-error";
import { FastifyInstance } from "fastify";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, req, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.issues,
    })
  }

  if (error.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({
      message: 'Validation error',
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({ message: error.message })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(401).send({ message: error.message })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(409).send({ message: error.message })
  }

  console.log(error.stack);
  console.log(error.message);
  console.log(error.name);
  console.log(error.cause);
  console.log(error.code);
  console.log(error.message);
  console.log(error.name);
  console.log(error.cause);

  reply.status(500).send({ message: 'Internal server error' })
}