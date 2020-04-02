const Parametros = require('../models/Parametros');
const controller = {};
const moment = require('moment');

//Create an Parametros
controller.new = async(req, res) => {
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
controller.getAll = async(req, res) => {
    try {
        parametros = await Parametros.findAll();
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
controller.change = async(req, res) => {
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
controller.delete = async(req, res) => {
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
controller.getById = async(req, res) => {
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

module.exports = controller;