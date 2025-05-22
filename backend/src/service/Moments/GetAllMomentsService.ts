import prismaClient from "../../prisma"

class GetAllMomentsService {
  async execute(userId: string) {

    const registeredMoments = await prismaClient.registeredMoment.findMany({
      where: {
        userId: userId
      },
      orderBy: { isFavorite: 'desc' }
    })

    return registeredMoments
  }
}

export { GetAllMomentsService }
