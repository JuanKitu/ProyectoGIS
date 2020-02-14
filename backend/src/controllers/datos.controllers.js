const Datos = require('../models/Datos');
const Parametros = require('../models/Parametros');
const Ambiente = require('../models/Ambiente');
const controller = {};

//Create a Dato
controller.new = async (req, res) => {
    const { idEnsayo, radio, distanciaTotal, tiempoTotal, materialBola } = req.body;
    try {
        const newDato = await Datos.create({
            idEnsayo,
            radio,
            distanciaTotal,
            tiempoTotal,
            materialBola
        });
        if (newDato) {
            return res.json({
                message: 'The Dato has been created',
                data: newDato
            });
        };
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Query a Probeta
controller.getAll = async (req, res) => {
    try {
        Dato = await Datos.findAll();
        return res.json({
            data: Dato
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Edit a Dato
controller.change = async (req, res) => {
    const { idDato } = req.params;
    const { idEnsayo, radio, distanciaTotal, tiempoTotal, materialBola } = req.body;
    try {
        await Datos.update({
            idEnsayo,
            radio,
            distanciaTotal,
            tiempoTotal,
            materialBola
        },
            {
                where: {
                    idDato
                },
            });
        const dato = await Datos.findOne({
            where: {
                idDato
            }
        });
        return res.json({
            message: 'The Dato has been changed',
            data: dato
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};
//Delete a Dato
controller.delete = async (req, res) => {
    try {
        const { idDato } = req.params;
        const deleteRowCount = await Datos.destroy({
            where: {
                idDato
            }
        });
        return res.json({
            message: 'The Dato has been deleted',
            count: deleteRowCount
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};
//Find a Dato
controller.getById = async (req, res) => {
    const { idDato } = req.params;
    try {
        const dato = await Datos.findOne({
            where: {
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

//Find all dato's parametros
controller.getAllParametros = async (req, res) => {
    const { idDato } = req.params;
    try {
        const parametro = await Parametros.findAll({
            where: {
                idDato
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
//Find a Dato's Parametro
controller.getAParametro = async (req, res) => {
    const { idParametro, idDato } = req.params;
    try {
        const parametro = await Parametros.findOne({
            where: {
                idParametro,
                idDato
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

//Find all dato's ambiente
controller.getAllAmbiente = async (req, res) => {
    const { idDato } = req.params;
    try {
        const ambiente = await Ambiente.findAll({
            where: {
                idDato
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

//Find a Dato's ambiente
controller.getAnAmbiente = async (req, res) => {
    const { idAmbiente, idDato } = req.params;
    try {
        const ambiente = await Ambiente.findOne({
            where: {
                idAmbiente,
                idDato
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