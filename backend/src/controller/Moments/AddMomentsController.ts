import { FastifyReply, FastifyRequest } from "fastify"
import { AddMomentsService } from "../../service/Moments/AddMomentsService";

interface RegisteredMomentProps {
  title: string;
  story: string;
  visitedLocation: string[];
  imageUrl: string;
  visitedDate: string;
}

class AddMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request
    const moment = request.body as RegisteredMomentProps

    if (!user) return reply.status(400).send({ error: true, message: "User does not exists!" })

    if (!moment.title || !moment.story || !moment.visitedLocation || !moment.imageUrl || !moment.visitedDate)
      return reply.status(400).send({ error: true, message: "All fields are required!" })

    try {
      const addMomentsService = new AddMomentsService()
      const addMoments = await addMomentsService.execute(moment, user.userId)

      return reply.status(201).send({ moment: addMoments, message: "Added successfully" })
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { AddMomentsController }