import { FastifyReply, FastifyRequest } from "fastify"
import { LoginUserService } from "../service/LoginUserService"

interface UserProps {
  email: string
  password: string
}

class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as UserProps

    if (!email || !password) {
      return reply.status(400).send({ message: "Todos os campos são requeridos" })
    }

    try {
      const loginUserService = new LoginUserService()

      const login = await loginUserService.execute({
        email,
        password
      })

      reply.send(login)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { LoginUserController }