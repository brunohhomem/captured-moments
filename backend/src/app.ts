import fastify from "fastify";
import { routes } from "./routes";
import fastifyMultipart from "@fastify/multipart";
import cors from '@fastify/cors'

const app = fastify({ logger: true })

app.register(cors)
app.register(fastifyMultipart)
app.register(routes)

export default app
