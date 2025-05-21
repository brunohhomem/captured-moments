import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authenticateToken } from "./middleware/authenticateToken";
import { CreateUserController } from "./controller/Auth/CreateUserController";
import { LoginUserController } from "./controller/Auth/LoginUserController";
import { GetUserController } from "./controller/Auth/GetUserController";

export function routes(fastify: FastifyInstance) {

  //AUTH: CREATE ACCOUNT
  fastify.post('/create-account', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply)
  })

  //AUTH: LOGIN
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginUserController().handle(request, reply)
  })

  //AUTH: GET USER
  fastify.get('/get-user', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetUserController().handle(request, reply)
  })
}
