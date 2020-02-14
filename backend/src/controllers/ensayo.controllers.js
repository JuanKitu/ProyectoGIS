const Ensayo = require('../models/Ensayo');
const Datos = require('../models/Datos');
const Probeta = require('../models/Probeta');
const controller = {};

//Create an Ensayo
controller.new = async (req, res) => {
    const { nroEnsayo, operador, observaciones } = req.body;
    try {
        const dateNow = new Date();
        const fecha = dateNow.toLocaleDateString();
        const newEnsayo = await Ensayo.create({
            nroEnsayo,
            fecha,
            operador,
            observaciones
        });
        if (newEnsayo) {
            return res.json({
                message: 'The Ensayo has been created',
                data: newEnsayo
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Query an Ensayo
controller.getAll = async (req, res) => {
    try {
        ensayos = await Ensayo.findAll();
        return res.json({
            data: ensayos
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Edit an ensayo
controller.change = async (req, res) => {
    const { idEnsayo } = req.params;
    const { nroEnsayo, fecha, operador, observaciones } = req.body;
    try {
        await Ensayo.update({
            nroEnsayo,
            fecha,
            operador,
            observaciones
        },
            {
                where: {
                    idEnsayo
                },
            });
        const ensayo = await Ensayo.findOne({
            where: {
                idEnsayo
            }
        });
        return res.json({
            message: 'The ensayo has been changed',
            data: ensayo
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};
//Delete an ensayo
controller.delete = async (req, res) => {
    try {
        const { idEnsayo } = req.params;
        const deleteRowCount = await Ensayo.destroy({
            where: {
                idEnsayo
            }
        });
        return res.json({
            message: 'The ensayo has been deleted',
            count: deleteRowCount
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};
//Find an Ensayo
controller.getById = async (req, res) => {
    const { idEnsayo } = req.params;
    try {
        const ensayo = await Ensayo.findOne({
            where: {
                idEnsayo
            }
        });
        return res.json({
            data: ensayo
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Find all ensayo's dato
controller.getAllDato = async (req, res) => {
    const { idEnsayo } = req.params;
    try {
        const dato = await Datos.findAll({
            where: {
                idEnsayo
            }
        });
        return res.json({
            data: dato
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};
//Find an Ensayo's Dato
controller.getADato = async (req, res) => {
    const { idEnsayo, idDato } = req.params;
    try {
        const dato = await Datos.findOne({
            where: {
                idEnsayo,
                idDato
            }
        });


        return res.json({
            data: dato
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Find all ensayo's probeta
controller.getAllProbeta = async (req, res) => {
    const { idEnsayo } = req.params;
    try {
        const probeta = await Probeta.findAll({
            where: {
                idEnsayo
            }
        });
        return res.json({
            data: probeta
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Find an Ensayo's Probeta
controller.getAProbeta = async (req, res) => {
    const { idEnsayo, idProbeta } = req.params;
    try {
        const probeta = await Probeta.findOne({
            where: {
                idEnsayo,
                idProbeta
            }
        });


        return res.json({
            data: probeta
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

module.exports = controller;