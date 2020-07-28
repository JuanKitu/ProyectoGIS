import { Request, Response } from 'express';
import Usuario from '../models/Usuario';

export default class UsuarioController {
    constructor() { }
    //Create an Usuario
    new = async (req: Request, res: Response) => {
        const { hash, salt, legajo } = req.body;
        try {
            const newUsuario = await Usuario.create({
                hash,
                salt,
                legajo
            });
            if (newUsuario) {
                return res.json({
                    message: 'The Usuario has been created',
                    data: newUsuario
                });
            };
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Query an Usuario
    getAll = async (req: Request, res: Response) => {
        try {
            const Usuarios = await Usuario.findAll();
            return res.json({
                data: Usuarios
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Edit an Usuario
    change = async (req: Request, res: Response) => {
        const { idUsuario } = req.params;
        const { hash, salt, legajo } = req.body;
        try {
            await Usuario.update({
                hash,
                salt,
                legajo
            },
                {
                    where: {
                        idUsuario
                    },
                });
            const usuario = await Usuario.findOne({
                where: {
                    idUsuario
                }
            });
            return res.json({
                message: 'The Usuario has been changed',
                data: usuario
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Delete an Usuario
    delete = async (req: Request, res: Response) => {
        try {
            const { idUsuario } = req.params;
            const deleteRowCount = await Usuario.destroy({
                where: {
                    idUsuario
                }
            });
            return res.json({
                message: 'The Usuario has been deleted',
                count: deleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find an Usuario
    getById = async (req: Request, res: Response) => {
        const { idUsuario } = req.params;
        try {
            const usuario = await Usuario.findOne({
                where: {
                    idUsuario
                }
            });
            return res.json({
                data: usuario
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
}


