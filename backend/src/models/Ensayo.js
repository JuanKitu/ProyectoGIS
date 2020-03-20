const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');
const Probeta = require('./Probeta');
const Ambiente = require('./Ambiente');
const Parametros = require('./Parametros');

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
    },
    radio: {
        type: Sequelize.REAL,
        allowNull: false
    },
    distanciaTotal: {
        type: Sequelize.REAL,
        allowNull: false
    },
    carga: {
        type: Sequelize.REAL,
        allowNull: false
    },
    tiempoTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    materialBola: {
        type: Sequelize.STRING(60),
        allowNull: false
    }

}, {
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});
//Cardinality with Ambiente
Ensayo.hasMany(Ambiente, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Ambiente.belongsTo(Ensayo, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });

//Cardinality with Parametros
Ensayo.hasMany(Parametros, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Parametros.belongsTo(Ensayo, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });

//Cardinality with Probeta
Ensayo.hasMany(Probeta, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Probeta.belongsTo(Ensayo, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });

module.exports = Ensayo;