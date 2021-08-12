import jwt from 'jsonwebtoken'
import {config} from '../config/config.js'
export const verifytoken=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        return res.status(401).json({
            error:'Acceso denegado'
        })
    }
    try {
        const verified=jwt.verify(token,config.TOKEN_SECRET)
        req.user=verified
        next()
    } catch (error) {
        res.status(400).json({
            error:'token no es valido'
        })
    }

}