const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');

const Parametros_archivados = sequelize.define('Parametros_Archivados', {
    fuerzaRozamiento: {
        type: Sequelize.REAL,
        allowNull: false
    },
    coeficienteRozamiento: {
        type: Sequelize.REAL,
        allowNull: false
    },
    vueltas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idParametro: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tiempoActual: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEnsayo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

module.exports = Parametros_archivados;