import { FastifyReply, FastifyRequest } from "fastify"
import { UpdateMomentsService } from "../../service/Moments/UpdateMomentsService";

interface RegisteredMomentProps {
  title: string;
  story: string;
  visitedLocation: string[];
  imageUrl: string;
  visitedDate: string;
}

class UpdateMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const { user } = request
    const moment = request.body as RegisteredMomentProps

    if (!user) return reply.status(400).send({ error: true, message: "User not found!" })

    if (!moment.title || !moment.story || !moment.visitedLocation || !moment.imageUrl || !moment.visitedDate)
      return reply.status(400).send({ error: true, message: "All fields are required!" })

    try {
      const updateMomentsService = new UpdateMomentsService()
      const updateMoment = await updateMomentsService.execute(moment, user.userId, id)

      return reply.status(201).send({ moment: updateMoment, message: "Updated successfully" })
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message })
    }
  }
}

export { UpdateMomentsController }