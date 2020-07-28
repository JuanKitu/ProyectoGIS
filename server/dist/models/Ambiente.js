"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
;
class Ambiente extends sequelize_1.Model {
}
exports.default = Ambiente;
;
Ambiente.init({
    temperatura: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    humedad: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    horaActual: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    idAmbiente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idEnsayo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Ambiente',
    timestamps: false,
    freezeTableName: true,
});
