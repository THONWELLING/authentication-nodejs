import { Request, Response, NextFunction } from "express"


export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    //criando uma variável para teste 
    let success = true

    // Fazer verificação de auth

    if(success) {
      next()
    } else {
    res.status(403) // Forbiden 
    res.json({ error: 'Not Authorized' })
  }
  } 
} 