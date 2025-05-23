import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authenticateToken } from "./middleware/authenticateToken";
import { CreateUserController } from "./controller/Auth/CreateUserController";
import { LoginUserController } from "./controller/Auth/LoginUserController";
import { GetUserController } from "./controller/Auth/GetUserController";
import { AddMomentsController } from "./controller/Moments/AddMomentsController";
import { GetAllMomentsController } from "./controller/Moments/GetAllMomentsController";
import { SearchAllMomentsController } from "./controller/Moments/SearchAllMomentsController";
import { UpdateMomentsController } from "./controller/Moments/UpdateMomentsController";
import { GenerateIaController } from "./controller/IA/GenerateIaController";
import { UploadFileController } from "./controller/Upload/UploadFileController";
import { upload } from "./config/multer";
import { DeleteFileController } from "./controller/Upload/DeleteFileController";
import { DeleteMomentsController } from "./controller/Moments/DeleteMomentsController";

export function routes(fastify: FastifyInstance) {

  //AUTH: CREATE ACCOUNT
  fastify.post('/create-account', async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateUserController().handle(request, reply)
  })

  //AUTH: LOGIN
  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    return new LoginUserController().handle(request, reply)
  })

  //AUTH: GET USER
  fastify.get('/get-user', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetUserController().handle(request, reply)
  })

  //MOMENT: ADD MOMENT
  fastify.post('/add-registered-moment', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new AddMomentsController().handle(request, reply)
  })

  //MOMENT: GET ALL MOMENTS BY USER
  fastify.get('/get-all-moments', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new GetAllMomentsController().handle(request, reply)
  })

  //MOMENT: SEARCH MOMENTS BY QUERY PARAMS
  fastify.get('/search', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new SearchAllMomentsController().handle(request, reply)
  })

  //MOMENT: UPDATE MOMENTS
  fastify.put('/edit-moment/:id', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UpdateMomentsController().handle(request, reply)
  })

  // MOMENT: DELETAR MOMENTO
  fastify.delete('/delete-moment/:id', { preHandler: authenticateToken }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteMomentsController().handle(request, reply)
  })

  //IA: GENERATE TEXT
  fastify.post('/ia', async (request: FastifyRequest, reply: FastifyReply) => {
    return new GenerateIaController().handle(request, reply)
  })

  //UPLOAD: UPLOAD IMAGE
  fastify.post('/image-upload', { preHandler: upload.single("image") }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new UploadFileController().handle(request, reply)
  })

  //UPLOAD: DELETE IMAGE
  fastify.delete('/delete-upload', { preHandler: upload.single("image") }, async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteFileController().handle(request, reply)
  })



}
