import { makeCreateUserUseCase } from '@/infra/http/factories/make-create-user-use-case';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        summary: 'Create a new user',
        tags: ['Sessions'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;

      const createUserUseCase = makeCreateUserUseCase();

      const result = await createUserUseCase.execute({
        name,
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;

        return reply.status(409).send({ message: error.message });
      }

      return reply.status(201).send({ message: 'User created successfully.' });
    },
  );
}