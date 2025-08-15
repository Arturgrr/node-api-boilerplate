import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { makeAuthenticateUserUseCase } from '../factories/make-authenticate-user-use-case';

export async function authenticateUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        summary: 'Authenticate a user',
        tags: ['Sessions'],
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;

      const authenticateUseCase = makeAuthenticateUserUseCase();

      const result = await authenticateUseCase.execute({
        email,
        password,
      });

      if (result.isLeft()) {
        const error = result.value;
        
        return reply.status(401).send({ message: error.message });
      }

      const { user } = result.value;

      const token = await reply.jwtSign(
        {
          userId: user.id.toString(),
          email: user.email,
        },
        {
          sign: {
            sub: user.id.toString(),
          },
        },
      );

      return reply.status(200).send({ token });
    },
  );
}