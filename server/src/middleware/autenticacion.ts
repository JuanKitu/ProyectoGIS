import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

// =====================
// Verificar Token
// =====================
export let verificaToken = (req: Request, res: Response, next: NextFunction) => {

    let token = req.get('token');
    console.log('middle')
    const seed: Secret = 'elseed';
    console.log(typeof(token));
    if(typeof(token)==='string'){
        console.log('antes de verify');
        jwt.verify(token, seed , (err:any , decoded:any) => {

            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Token no válido'
                    }
                });
            } else {
                console.log(decoded)
                res.set("usuario", decoded.usuario);
                next();
            }
    
            
    
        });
    
    }
    


};