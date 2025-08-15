import { UnauthorizedError } from "@/application/errors/unauthorized-error";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const auth = fp(async (app: FastifyInstance) => {
  app.addHook("preHandler", async (request) => {

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token não fornecido');
    }

    request.getCurrentUser = async () => {
      try {
        const { userId, email } = await request.jwtVerify<{
          userId: string,
          email: string,
        }>()

        return {
          userId,
          email,
        }
      } catch (error) {
        throw new UnauthorizedError('Invalid token')
      }
    }
  })
})