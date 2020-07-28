"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
;
class Usuario extends sequelize_1.Model {
}
exports.default = Usuario;
;
Usuario.init({
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    legajo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Usuario',
    timestamps: false,
    freezeTableName: true,
});
module.exports = Usuario;
