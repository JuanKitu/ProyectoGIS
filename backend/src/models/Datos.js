const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');
const Ambiente = require('./Ambiente');
const Parametros = require('./Parametros');

const Datos = sequelize.define('Datos', {
    radio: {
        type: Sequelize.REAL,
        allowNull: false
    },
    distanciaTotal: {
        type: Sequelize.REAL,
        allowNull: false
    },
    tiempoTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idDato: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    materialBola: {
        type: Sequelize.STRING(60),
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

//Cardinality with Ambiente
Datos.hasMany(Ambiente, { foreingKey: 'idDato', sourceKey: 'idDato' });
Ambiente.belongsTo(Datos, { foreingKey: 'idDato', sourceKey: 'idDato' });

//Cardinality with Parametros
Datos.hasMany(Parametros, { foreingKey: 'idDato', sourceKey: 'idDato' });
Parametros.belongsTo(Datos, { foreingKey: 'idDato', sourceKey: 'idDato' });

module.exports = Datos;