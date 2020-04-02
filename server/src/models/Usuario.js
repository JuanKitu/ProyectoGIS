const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    legajo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

module.exports = Usuario;