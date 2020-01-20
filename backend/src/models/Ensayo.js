const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');
const Datos = require('./Datos');
const Probeta = require('./Probeta');

const Ensayo = sequelize.define('Ensayo', {
    idEnsayo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nroEnsayo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    operador: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    observaciones: {
        type: Sequelize.TEXT,
    }

}, {
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

//Cardinality with Datos
Ensayo.hasMany(Datos, { foreingKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Datos.belongsTo(Ensayo, { foreingKey: 'idEnsayo', sourceKey: 'idEnsayo' });

//Cardinality with Probeta
Ensayo.hasMany(Probeta, { foreingKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Probeta.belongsTo(Ensayo, { foreingKey: 'idEnsayo', sourceKey: 'idEnsayo' });

module.exports = Ensayo;