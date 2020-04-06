const Ensayo = require('../models/Ensayo');
const Parametros = require('../models/Parametros');
const Ambiente = require('../models/Ambiente');
const controller = {};

//Create an Ensayo
controller.new = async(req, res) => {
    const { carga, radioTrayectoria, diametroBola, distanciaTotal, tiempoTotal, materialBola, fecha, operador, observaciones, codigoProbeta, durezaProbeta, materialProbeta, tratamientoProbeta } = req.body;
    try {
        const dateNow = new Date();
        const fecha = dateNow.toLocaleDateString();
        const newEnsayo = await Ensayo.create({
            carga,
            radioTrayectoria,
            diametroBola,
            distanciaTotal,
            tiempoTotal,
            materialBola,
            fecha,
            operador,
            observaciones,
            codigoProbeta,
            durezaProbeta,
            materialProbeta,
            tratamientoProbeta
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
controller.getAll = async(req, res) => {
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
controller.change = async(req, res) => {
    const { idEnsayo } = req.params;
    const { carga, radioTrayectoria, diametroBola, distanciaTotal, tiempoTotal, materialBola, fecha, operador, observaciones, codigoProbeta, durezaProbeta, materialProbeta, tratamientoProbeta } = req.body;
    try {
        await Ensayo.update({
            carga,
            radioTrayectoria,
            diametroBola,
            distanciaTotal,
            tiempoTotal,
            materialBola,
            fecha,
            operador,
            observaciones,
            codigoProbeta,
            durezaProbeta,
            materialProbeta,
            tratamientoProbeta
        }, {
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
controller.delete = async(req, res) => {
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
controller.getById = async(req, res) => {
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

//Find all Ensayo's parametros
controller.getAllParametros = async(req, res) => {
    const { idEnsayo } = req.params;
    try {
        const parametro = await Parametros.findAll({
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

//Create an Ensayo's Parametro
/*controller.newParametro = async(req, res) => {
    const { idEnsayo } = req.params;
    const Ensayo = await Ensayos.findOne({
        where: {
            idEnsayo
        }
    });
    try {
        const coeficienteRozamiento = (9.8 * Ensayo.carga) / fuerzaRozamiento;
        const newParametros = await Parametros.create({
            coeficienteRozamiento,
            idEnsayo
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
*/
//Find a Ensayo's Parametro
controller.getAParametro = async(req, res) => {
    const { idParametro, idEnsayo } = req.params;
    try {
        const parametro = await Parametros.findOne({
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
controller.getAllAmbiente = async(req, res) => {
    const { Ensayo } = req.params;
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
controller.getAnAmbiente = async(req, res) => {
    const { idAmbiente, Ensayo } = req.params;
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


module.exports = controller;