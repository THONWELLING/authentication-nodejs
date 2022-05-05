import express, { Request, Response, ErrorRequestHandler } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRoutes from'./routes/api'


dotenv.config()

//instanciando o servidor 
const server = express()

// Para corrigir erros de cors
server.use(cors())

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }))

//usando uma rota de teste
server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }))

//usando as rotas do nosso arquivo routes
server.use(apiRoutes)

//Criando uma rota  de página não encontrada
server.use((req: Request, res: Response) => {
  res.status(404)
  res.json({ error: 'Endpoint Not Found!!' })
})


//Criando um endpoint para lidar com erros
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400)  // Bad Request, falta de informação ou requisição fora da regra
  console.log(err)
  res.json({ error: 'Something Wrong Happened!!' })
}
server.use(errorHandler)


server.listen(process.env.PORT)