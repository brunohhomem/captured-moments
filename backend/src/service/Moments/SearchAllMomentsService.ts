import prismaClient from "../../prisma"

interface SearchProps {
  user: { userId: string }
  query: string
}

class SearchAllMomentsService {
  async execute({ user, query }: SearchProps) {

    const searchResult = await prismaClient.registeredMoment.findMany({
      where: {
        userId: user.userId,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { story: { contains: query, mode: 'insensitive' } },
          { visitedLocation: { hasSome: [query] } }
        ]
      },
      orderBy: { isFavorite: 'desc' }
    })

    return searchResult
  }
}

export { SearchAllMomentsService }
