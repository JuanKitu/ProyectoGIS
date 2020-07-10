const Parametros_archivados = require('../models/Parametros_archivados');
const controller = {};
const moment = require('moment');



//Query an Parametros
controller.getAll = async(req, res) => {
    try {
        parametros_archivados = await Parametros_archivados.findAll();
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
controller.delete = async(req, res) => {
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
controller.getById = async(req, res) => {
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

module.exports = controller;