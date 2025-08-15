import { FastifyInstance } from "fastify";
import { authenticateUser } from "../controllers/authenticate-user";
import { createUser } from "../controllers/create-user";
import { getUserData } from "../controllers/get-user-data";

export async function userRoutes(app: FastifyInstance) {
  app.register(createUser)
  app.register(authenticateUser)
  app.register(getUserData)
}