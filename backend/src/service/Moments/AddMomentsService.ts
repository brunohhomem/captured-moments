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

    const placeHolderImageUrl = `http://localhost:8000/uploads/placeholder.svg`

    const registeredMoment = await prismaClient.registeredMoment.create({
      data: {
        ...moment,
        visitedDate: parsedVisitedDate,
        userId: userId,
        imageUrl: moment.imageUrl || placeHolderImageUrl
      }
    })

    return { moment: registeredMoment }
  }
}

export { AddMomentsService }