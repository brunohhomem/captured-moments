import { FastifyReply, FastifyRequest } from "fastify"
import { SearchAllMomentsService } from "../../service/Moments/SearchAllMomentsService"


class SearchAllMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { query } = request.query as { query: string }
    const { user } = request

    if (!user) return reply.status(400).send({ error: true, message: "User not found" })
    if (!query) return reply.status(400).send({ error: true, message: "query is required" })

    try {
      const searchAllMomentsService = new SearchAllMomentsService()

      const searchMoments = await searchAllMomentsService.execute({ user, query })

      reply.status(200).send({ memories: searchMoments })

    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { SearchAllMomentsController }