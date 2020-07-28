import { Request, Response } from 'express';
import Parametros from '../models/Parametros';


export default class ParametrosController {
    constructor() { }
    //Create an Parametros
    new = async (req: Request, res: Response) => {
        const { idEnsayo, fuerzaRozamiento, coeficienteRozamiento, vueltas, tiempoActual } = req.body;
        try {
            const newParametros = await Parametros.create({
                idEnsayo,
                fuerzaRozamiento,
                coeficienteRozamiento,
                vueltas,
                tiempoActual,
            });
            if (newParametros) {
                return res.json({
                    message: 'The Parametros has been created',
                    data: newParametros
                });
            };
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Query an Parametros
    getAll = async (req: Request, res: Response) => {
        try {
            const parametros = await Parametros.findAll();
            return res.json({
                data: parametros
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Edit an parametro
    change = async (req: Request, res: Response) => {
        const { idParametro } = req.params;
        const { idEnsayo, fuerzaRozamiento, coeficienteRozamiento, vueltas, tiempoActual } = req.body;
        try {
            await Parametros.update({
                idEnsayo,
                fuerzaRozamiento,
                coeficienteRozamiento,
                vueltas,
                tiempoActual,
            }, {
                where: {
                    idParametro
                },
            });
            const parametro = await Parametros.findOne({
                where: {
                    idParametro
                }
            });
            return res.json({
                message: 'The parametro has been changed',
                data: parametro
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Delete an parametro
    delete = async (req: Request, res: Response) => {
        try {
            const { idParametro } = req.params;
            const deleteRowCount = await Parametros.destroy({
                where: {
                    idParametro
                }
            });
            return res.json({
                message: 'The parametro has been deleted',
                count: deleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find an Parametros
    getById = async (req: Request, res: Response) => {
        const { idParametro } = req.params;
        try {
            const parametro = await Parametros.findOne({
                where: {
                    idParametro
                }
            });
            return res.json({
                data: parametro
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
}