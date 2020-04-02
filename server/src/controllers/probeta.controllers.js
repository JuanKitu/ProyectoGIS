const Probeta = require('../models/Probeta');
const controller = {};

//Create an Probeta
controller.new = async(req, res) => {
    const { idEnsayo, codigoProbeta, dureza, materialProbeta, tratamiento } = req.body;
    try {
        const newProbeta = await Probeta.create({
            idEnsayo,
            codigoProbeta,
            dureza,
            materialProbeta,
            tratamiento
        });
        if (newProbeta) {
            return res.json({
                message: 'The Probeta has been created',
                data: newProbeta
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
controller.getAll = async(req, res) => {
    try {
        Probetas = await Probeta.findAll();
        return res.json({
            data: Probetas
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};

//Edit an Probeta
controller.change = async(req, res) => {
    const { idProbeta } = req.params;
    const { idEnsayo, codigoProbeta, dureza, materialProbeta, tratamiento } = req.body;
    try {
        await Probeta.update({
            idEnsayo,
            codigoProbeta,
            dureza,
            materialProbeta,
            tratamiento
        }, {
            where: {
                idProbeta
            },
        });
        const probeta = await Probeta.findOne({
            where: {
                idProbeta
            }
        });
        return res.json({
            message: 'The Probeta has been changed',
            data: probeta
        });
    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};
//Delete an Probeta
controller.delete = async(req, res) => {
    try {
        const { idProbeta } = req.params;
        const deleteRowCount = await Probeta.destroy({
            where: {
                idProbeta
            }
        });
        return res.json({
            message: 'The Probeta has been deleted',
            count: deleteRowCount
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: 'The server has an error'
        });
    }
};
//Find an Probeta
controller.getById = async(req, res) => {
    const { idProbeta } = req.params;
    try {
        const probeta = await Probeta.findOne({
            where: {
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