import fastify, { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prismaClient from "./prisma";
import { routes } from "./routes";

const app = fastify({ logger: true })

const start = async () => {

  app.register(routes)

  app.listen({ port: 8000 }, () => {
    console.log("server running...🚀")
  })
}

start()
