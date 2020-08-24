import { Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
 export default class SocketController{
     constructor(){}
     getUsuarios = async (req:Request,res:Response)=>{
         const server = Server.instance;
         server.io.clients( (err:any, clientes:Socket)=>{
             if(err){
                return res.json({
                     error:false,
                     err
                 });
             };
             return res.json({
                 error:false,
                 clientes
             });
         });
     };
 }