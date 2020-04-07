const Sequelize = require('sequelize');
const { sequelize } = require('../database/database.js');
const Ambiente = require('./Ambiente');
const Parametros = require('./Parametros');

const Ensayo = sequelize.define('Ensayo', {
    idEnsayo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha: {
        type: Sequelize.DATE,
        allowNull: false
    },
    radioTrayectoria: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    operador: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    observaciones: {
        type: Sequelize.TEXT,
    },
    diametroBola: {
        type: Sequelize.REAL,
        allowNull: false
    },
    distanciaTotal: {
        type: Sequelize.REAL,
        allowNull: true
    },
    carga: {
        type: Sequelize.REAL,
        allowNull: false
    },
    tiempoTotal: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    materialBola: {
        type: Sequelize.STRING(60),
        allowNull: false
    },
    durezaProbeta: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    tratamientoProbeta: {
        type: Sequelize.STRING(40),
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
//Cardinality with Ambiente
Ensayo.hasMany(Ambiente, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Ambiente.belongsTo(Ensayo, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });

//Cardinality with Parametros
Ensayo.hasMany(Parametros, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Parametros.belongsTo(Ensayo, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });


module.exports = Ensayo;