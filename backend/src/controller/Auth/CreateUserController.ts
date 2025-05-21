import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserService } from "../../service/Auth/CreateUserService"

interface UserProps {
  fullName: string
  email: string
  password: string
}

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { fullName, email, password } = request.body as UserProps

    if (!fullName || !email || !password) {
      return reply.status(400).send({ message: "All fields are required" })
    }

    try {
      const createUserService = new CreateUserService()

      const user = await createUserService.execute({
        fullName,
        email,
        password
      })

      reply.send(user)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { CreateUserController }