import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { makeGetUserDataUseCase } from '../factories/make-get-user-data-use-case';
import { auth } from '../middleware/auth';

export async function getUserData(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).get(
    '/users/me',
    {
      schema: {
        security: [{
          bearerAuth: [],
        }],
        summary: 'Get user data',
        tags: ['Sessions'],
        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              createdAt: z.string(),
            }),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { userId } = await request.getCurrentUser();

      const getUserDataUseCase = makeGetUserDataUseCase();

      const result = await getUserDataUseCase.execute({
        userId,
      });

      if (result.isLeft()) {
        const error = result.value; 

        return reply.status(409).send({ message: error.message });
      }

      const { user } = result.value;

      return reply.status(200).send({ user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        createdAt: user.createdAt.toISOString(),
      } });
    },
  );
}