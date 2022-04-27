import { Router } from 'express'

import * as ApiController from '../controllers/apiController'


//instanciando o router
const router = Router()


//Criando as rotas
router.post('/register', ApiController.register)
router.post('/login', ApiController.login)
router.get('/list', ApiController.list)



export default router