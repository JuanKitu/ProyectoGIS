const Ensayo_Archivados = require('../models/Ensayo_Archivados');
const Ensayo = require('../models/Ensayo');
const Parametros_Archivados = require('../models/Parametros_Archivados');
const Ambiente = require('../models/Ambiente');
const Parametros_archivados = require('../models/Parametros_Archivados');
const Parametros = require('../models/Parametros');
const controller = {};

//Restore an Ensayo
controller.restoreEnsayo = async (req, res) => {
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
        const newParametros = await Parametros_archivados.findAll({
            where: {
                idEnsayo
            },
            raw: true

        });
        if (restoredEnsayo) {
            if (newParametros) {
                //Creating the Ensayo
                await Ensayo.create(restoredEnsayo)
                //Creating all Parametros in cascade because the JSON newParametros contains several parametros using bulkCreate
                await Parametros.bulkCreate(newParametros)
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
controller.getAll = async (req, res) => {
    try {
        archivados = await Ensayo_Archivados.findAll();
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
controller.getById = async (req, res) => {
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
controller.getAllParametros = async (req, res) => {
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
controller.getAParametro = async (req, res) => {
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
controller.getAllAmbiente = async (req, res) => {
    const { Archivado } = req.params;
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
controller.getAnAmbiente = async (req, res) => {
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
controller.delete = async (req, res) => {
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

module.exports = controller;