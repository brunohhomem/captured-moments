import prismaClient from "../../prisma"

interface RegisteredMomentProps {
  title: string;
  story: string;
  visitedLocation: string[],
  imageUrl: string;
  visitedDate: string;
}

class UpdateMomentsService {
  async execute(moment: RegisteredMomentProps, userId: string, id: string) {

    const placeHolderImageUrl = `http://localhost:8000/uploads/placeholder.svg`

    const parsedVisitedDate = new Date(parseInt(moment.visitedDate))

    const registeredMoment = await prismaClient.registeredMoment.findFirst({
      where: {
        id: id,
        userId: userId
      }
    })

    if (!registeredMoment) return new Error("Moment not found")

    const updateMoment = await prismaClient.registeredMoment.update({
      where: { id: id },
      data: {
        title: moment.title,
        story: moment.story,
        visitedLocation: moment.visitedLocation,
        imageUrl: moment.imageUrl || placeHolderImageUrl,
        visitedDate: parsedVisitedDate,
      }
    })

    return { moment: updateMoment }
  }
}

export { UpdateMomentsService }