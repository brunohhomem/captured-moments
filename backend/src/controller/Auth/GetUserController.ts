import { FastifyReply, FastifyRequest } from "fastify"
import { GetUserService } from "../../service/Auth/GetUserService"

interface UserProps {
  user: {
    userId: string
  }
}

class GetUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request as UserProps

    if (!user) return reply.status(400).send({ error: true, message: "User is required" })

    try {
      const getUserService = new GetUserService()

      const isUser = await getUserService.execute({
        user
      })

      reply.send(isUser)
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { GetUserController }