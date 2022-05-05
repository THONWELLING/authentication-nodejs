import { Request, Response } from 'express'
import { User } from '../models/User'
import  JWT  from 'jsonwebtoken'
import dotenv from 'dotenv'



dotenv.config()

//Rota de teste

export const ping = (req: Request, res: Response) => {
  res.json({pong: true})
}

// Criando um novo usuário 

export const register = async (req: Request, res: Response) => {
  if(req.body.email && req.body.password) {
    let { email, password } = req.body
    let hasUser = await User.findOne({where: { email }})

    if(!hasUser) {
      let newUser = await User.create({ email, password })
      // gerando um token quan do fazemos o register de novo usuário
      const token = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '15d' }
      )

      res.status(201)
      res.json({ id: newUser.id, token })
    } else {
      res.json({ error: 'Email Already Exists!!' })
    }
  }
  res.json({ error: 'Email Or Password Not Sent!!' })
}


// Fazendo o login
export const login = async (req: Request, res: Response) => {
  if(req.body.email && req.body.password) {
    let email: string = req.body.email
    let password: string = req.body.password

    let user = await User.findOne({ 
      where: { email, password }
    })

    if(user) {
      //gerando o token
      const token = JWT.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '15d' }
      )

      res.json({ status: true, token })
      return
    }
  }
  res.json({ status: false })
}


// Pegando a lista de todos os usuários 
export const list = async (req: Request, res: Response) => {
  let users = await User.findAll()
  let list: string[] = []

  for(let i in users) {
    list.push( users[i].email )
  }
  res.json({ list })
}