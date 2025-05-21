import fastify, { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prismaClient from "./prisma";

const app = fastify({ logger: true })

const start = async () => {

  app.get('/backend', async (request, reply) => {
    return reply.status(200).send({ message: "Backend running..." })
  })

  //Criação de usuário
  app.post('/create-account', async (request: FastifyRequest, reply: FastifyReply) => {
    const { fullName, email, password } = request.body as { fullName: string, email: string, password: string }

    if (!fullName || !email || !password) {
      return reply.status(400).send({ message: "Todos os campos são requeridos" })
    }

    const isUser = await prismaClient.user.findFirst({
      where: { email: email }
    })

    if (isUser) {
      return reply.status(400).send({ error: true, message: "Usuário já existe" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prismaClient.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword
      }
    })

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "72h" }
    )

    return reply.status(200).send(
      {
        error: false,
        user: { fullName: user.fullName, email: user.email },
        accessToken,
        message: "Registro efetuado com sucesso"
      }
    )
  })

  //Login
  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string, password: string }

    if (!email || !password) {
      return reply.status(400).send({ message: "Todos os campos são requeridos" })
    }

    const isUser = await prismaClient.user.findFirst({
      where: { email: email }
    })

    if (!isUser) {
      return reply.status(400).send({ error: true, message: "Credenciais inválidas" }) //Não devolver campo específico que está errado, mensagem generica sempre em auth
    }

    const isPasswordValid = await bcrypt.compare(password, isUser.password)

    if (!isPasswordValid) {
      return reply.status(400).send({ error: true, message: "Credenciais inválidas" })
    }

    const accessToken = jwt.sign(
      { userId: isUser.id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "72h" }
    )

    return {
      erro: false,
      message: "Login efetuado com sucesso",
      user: {
        fullName: isUser.fullName,
        email: isUser.email
      },
      accessToken
    }
  })

  app.listen({ port: 8000 }, () => {
    console.log("server running...🚀")
  })
}

start()
