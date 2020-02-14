const Ambiente = require('../models/Ambiente');
const controller = {};
const moment = require('moment');

//Create an Ambiente
controller.new = async (req, res) => {
    const { idDato, temperatura, humedad, horaActual } = req.body;
    try {
        const horaActual = (moment().format('HH:mm:ss'));
        const newAmbiente = await Ambiente.create({
            idDato,
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
controller.getAll = async (req, res) => {
    try {
        Ambientes = await Ambiente.findAll();
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
controller.change = async (req, res) => {
    const { idAmbiente } = req.params;
    const { idDato, temperatura, humedad, horaActual } = req.body;
    try {
        await Ambiente.update({
            idDato,
            temperatura,
            humedad,
            horaActual
        },
            {
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
controller.delete = async (req, res) => {
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
controller.getById = async (req, res) => {
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

module.exports = controller;