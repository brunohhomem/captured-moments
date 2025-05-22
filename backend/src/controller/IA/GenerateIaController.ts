import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";

class GenerateIaController {
  async handle(request: FastifyRequest, reply: FastifyReply) {

    const { text } = request.body as { text: string }

    try {
      const response = await axios.post('http://localhost:11434/api/generate',
        {
          "model": "llama3.2:3b",
          "prompt": `Quero que você melhore a seguinte frase e acrescente detalhes de forma resumida: "${text}". Quero uma resposta que não contenha nenhuma outra palavra além do resultado da frase, nem apresentação ou gracejo. Quero que se limite a uma resposta direta. Corrija a gramática e a concordância verbal quando necessário. Mantenha as respostas em português do Brasil.`,
          "stream": false
        })

      reply.send(response.data.response)
    } catch (error) {
      reply.status(500).send({ message: "Processing error!!!", prompt: text })
    }
  }
}

export { GenerateIaController }