import { Router } from 'express'
import { Auth } from '../middlewares/auth'

import * as ApiController from '../controllers/apiController'


//instanciando o router
const router = Router()


//Criando as rotas
router.post('/register', ApiController.register)
router.post('/login', ApiController.login)
router.get('/list', Auth.private,  ApiController.list) // rota privada necessário autenticação 



export default router