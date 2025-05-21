import { FastifyReply, FastifyRequest } from "fastify"
import { LoginUserService } from "../service/LoginUserService"

class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as { email: string, password: string }

    if (!email || !password) {
      return reply.status(400).send({ message: "Todos os campos são requeridos" })
    }

    try {
      const loginUserService = new LoginUserService()

      const user = await loginUserService.execute({
        email,
        password
      })

      reply.send(user)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { LoginUserController }