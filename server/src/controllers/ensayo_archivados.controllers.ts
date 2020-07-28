import { Request, Response } from 'express';
import Ensayo_Archivados from '../models/Ensayo_Archivados';
import Ensayo from '../models/Ensayo';
import Ambiente from '../models/Ambiente';
import Parametros_Archivados from '../models/Parametros_archivados';
import Parametros from '../models/Parametros';
const controller = {};
export default class EnsayoArchivadosController {
    constructor() { }

    //Restore an Ensayo
    restoreEnsayo = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        //Finding the Ensayo we want to restore and use the raw data
        try {
           
            const restoredEnsayo = await Ensayo_Archivados.findOne({
                where: {
                    idEnsayo
                },
                raw: true
            });
            //Finding all the Parametros belonging to the Ensayo and use the raw data
            const newParametros = await Parametros_Archivados.findAll({
                where: {
                    idEnsayo
                },
                raw: true

            });
            if (restoredEnsayo) {
                if (newParametros) {
                    //Creating the Ensayo
                    const auxEnsayo:any=restoredEnsayo;
                    await Ensayo.create(auxEnsayo)
                    //Creating all Parametros in cascade because the JSON newParametros contains several parametros using bulkCreate
                    const pruebaParametros:any[] = newParametros;
                    await Parametros.bulkCreate(pruebaParametros)
                    return res.json({
                        message: 'The Parametros has been created',
                        data: newParametros
                    }),
                        await Ensayo_Archivados.destroy({
                            where: {
                                idEnsayo
                            }
                        });
                }

            };

            return {}
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Query an Ensayo
    getAll = async (req: Request, res: Response) => {
        try {
            const archivados = await Ensayo_Archivados.findAll();
            return res.json({
                data: archivados
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find an Ensayo
    getById = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const archivado = await Ensayo_Archivados.findOne({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                data: archivado
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find all Ensayo's parametros
    getAllParametros = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const parametro = await Parametros_Archivados.findAll({
                where: {
                    idEnsayo
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
    //Find a Ensayo's Parametro
    getAParametro = async (req: Request, res: Response) => {
        const { idParametro, idEnsayo } = req.params;
        try {
            const parametro = await Parametros_Archivados.findOne({
                where: {
                    idParametro,
                    idEnsayo
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
    //Find all Ensayo's ambiente
    getAllAmbiente = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const ambiente = await Ambiente.findAll({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                data: ambiente
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find a Ensayo's ambiente
    getAnAmbiente = async (req: Request, res: Response) => {
        const { idAmbiente, idEnsayo } = req.params;
        try {
            const ambiente = await Ambiente.findOne({
                where: {
                    idAmbiente,
                    idEnsayo
                }
            });


            return res.json({
                data: ambiente
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Delete an ensayo
    delete = async (req: Request, res: Response) => {
        try {
            const { idEnsayo } = req.params;
            const deleteRowCount = await Ensayo_Archivados.destroy({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                message: 'The Archivado has been deleted',
                count: deleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
}
