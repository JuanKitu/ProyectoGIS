"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
;
class Parametros_Archivados extends sequelize_1.Model {
}
exports.default = Parametros_Archivados;
;
Parametros_Archivados.init({
    fuerzaRozamiento: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    coeficienteRozamiento: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    vueltas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idParametro: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tiempoActual: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    idEnsayo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Parametros_Archivados',
    timestamps: false,
    freezeTableName: true,
});
