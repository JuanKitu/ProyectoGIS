const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');

const Ambiente = sequelize.define('Ambiente', {
    temperatura: {
        type: Sequelize.REAL,
        allowNull: false
    },
    humedad: {
        type: Sequelize.REAL,
        allowNull: false
    },
    horaActual: {
        type: Sequelize.TIME,
        allowNull: false
    },
    idAmbiente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

module.exports = Ambiente;