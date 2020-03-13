const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');

const Parametros = sequelize.define('Parametros', {
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
    horaActual: {
        type: Sequelize.TIME,
        allowNull: false
    },
    idDato: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

module.exports = Parametros;