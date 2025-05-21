import prismaClient from "../prisma"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface UserProps {
  email: string
  password: string
}

class LoginUserService {
  async execute({ email, password }: UserProps) {

    const user = await prismaClient.user.findFirst({
      where: { email: email }
    })

    if (!user) {
      throw new Error("Credenciais inválidas")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas")
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "72h" }
    )

    return {
      erro: false,
      message: "Login efetuado com sucesso",
      user: {
        fullName: user.fullName,
        email: user.email
      },
      accessToken
    }
  }
}


export { LoginUserService }