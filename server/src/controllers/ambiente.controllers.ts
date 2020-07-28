
import { Request, Response } from 'express';
import Ambiente from '../models/Ambiente';
const moment = require('moment');
export default class AmbienteController{
    constructor(){}
    new = async(req:Request , res:Response) => {
        const { idEnsayo, temperatura, humedad } = req.body;
        try {
            const horaActual = (moment().format('HH:mm:ss'));
            const newAmbiente = await Ambiente.create({
                idEnsayo,
                temperatura,
                humedad,
                horaActual
            });
            if (newAmbiente) {
                return res.json({
                    message: 'The Ambiente has been created',
                    data: newAmbiente
                });
            };
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    
    //Query a Ambiente
    getAll = async(req:Request , res:Response) => {
        try {
            const Ambientes = await Ambiente.findAll();
            return res.json({
                data: Ambientes
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    
    //Edit an Ambiente
    change = async(req:Request , res:Response) => {
        const { idAmbiente } = req.params;
        const { idEnsayo, temperatura, humedad, horaActual } = req.body;
        try {
            await Ambiente.update({
                idEnsayo,
                temperatura,
                humedad,
                horaActual
            }, {
                where: {
                    idAmbiente
                },
            });
            const ambiente = await Ambiente.findOne({
                where: {
                    idAmbiente
                }
            });
            return res.json({
                message: 'The Ambiente has been changed',
                data: ambiente
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Delete an Ambiente
    delete = async(req:Request , res:Response) => {
        try {
            const { idAmbiente } = req.params;
            const deleteRowCount = await Ambiente.destroy({
                where: {
                    idAmbiente
                }
            });
            return res.json({
                message: 'The Ambiente has been deleted',
                count: deleteRowCount
            });
    
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find an Ambiente
    getById = async(req:Request , res:Response) => {
        const { idAmbiente } = req.params;
        try {
            const ambiente = await Ambiente.findOne({
                where: {
                    idAmbiente
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
}
