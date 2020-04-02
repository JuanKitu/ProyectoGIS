const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');

const Probeta = sequelize.define('Probeta', {
    idProbeta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    dureza: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    idEnsayo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tratamiento: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    materialProbeta: {
        type: Sequelize.STRING(60),
        allowNull: true
    },
    codigoProbeta: {
        type: Sequelize.STRING(20),
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

module.exports = Probeta;