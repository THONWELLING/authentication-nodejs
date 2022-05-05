import { Request, Response, NextFunction } from "express"
import JWT from'jsonwebtoken'
import dotenv from'dotenv'




dotenv.config()

export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    //criando uma variável para teste 
    let success = false

    // Fazer verificação de auth
    if(req.headers.authorization) {
      const [authType, token] = req.headers.authorization.split( ' ' )
      if(authType === 'Bearer') {
        try {
          JWT.verify(token, process.env.JWT_SECRET as string)
          success = true
        } catch(err) {
          
        } 
      }

    }
    if(success) {
      next()
    } else {
    res.status(403) // Forbidden 
    res.json({ error: 'Not Authorized, Forbidden' })
  }
  } 
} 