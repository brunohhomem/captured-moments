import 'fastify'

//Injetando o user dentro do FastifyRequest
declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string
    }
  }
}
