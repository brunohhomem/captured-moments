import prismaClient from "../../prisma"

interface RegisteredMomentProps {
  title: string;
  story: string;
  visitedLocation: string[],
  imageUrl: string;
  visitedDate: string;
}

class AddMomentsService {
  async execute(moment: RegisteredMomentProps, userId: string) {

    const parsedVisitedDate = new Date(parseInt(moment.visitedDate))

    const registeredMoment = await prismaClient.registeredMoment.create({
      data: {
        ...moment,
        visitedDate: parsedVisitedDate,
        userId: userId
      }
    })

    return { moment: registeredMoment }
  }
}

export { AddMomentsService }