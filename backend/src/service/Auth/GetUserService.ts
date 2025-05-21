import prismaClient from "../../prisma"

interface UserProps {
  user: {
    userId: string
  }
}

class GetUserService {
  async execute({ user }: UserProps) {

    const isUser = await prismaClient.user.findUnique({
      where: {
        id: user.userId
      }
    })

    if (!isUser) throw new Error("User not found")

    return {
      user: isUser,
      message: "User Found"
    }
  }
}


export { GetUserService }