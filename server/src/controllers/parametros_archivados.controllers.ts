import { Request, Response } from 'express';
import Parametros_archivados from '../models/Parametros_archivados';

export default class ParametrosArchivadosIController {
    constructor() { }
    //Query an Parametros
    getAll = async (req: Request, res: Response) => {
        try {
            const parametros_archivados = await Parametros_archivados.findAll();
            console.log(parametros_archivados);
            return res.json({
                data: parametros_archivados
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
            const deleteRowCount = await Parametros_archivados.destroy({
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
            const parametros_archivados = await Parametros_archivados.findOne({
                where: {
                    idParametro
                }
            });
            return res.json({
                data: parametros_archivados
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
}
