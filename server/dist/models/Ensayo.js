"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
;
class Ensayo extends sequelize_1.Model {
}
exports.default = Ensayo;
;
const Ambiente_1 = __importDefault(require("./Ambiente"));
const Parametros_1 = __importDefault(require("./Parametros"));
Ensayo.init({
    idEnsayo: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    radioTrayectoria: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    operador: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    observaciones: {
        type: sequelize_1.DataTypes.TEXT,
    },
    diametroBola: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    distanciaTotal: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: true
    },
    carga: {
        type: sequelize_1.DataTypes.REAL,
        allowNull: false
    },
    tiempoTotal: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    materialBola: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false
    },
    durezaProbeta: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    tratamientoProbeta: {
        type: sequelize_1.DataTypes.STRING(40),
        allowNull: false
    },
    materialProbeta: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: true
    },
    codigoProbeta: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Ensayo',
    timestamps: false,
    freezeTableName: true,
});
//Cardinality with Ambiente
Ensayo.hasMany(Ambiente_1.default, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Ambiente_1.default.belongsTo(Ensayo, { foreignKey: 'idEnsayo' /* , sourceKey: 'idEnsayo' */ });
//Cardinality with Parametros
Ensayo.hasMany(Parametros_1.default, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo', as: 'Parametros' });
Parametros_1.default.belongsTo(Ensayo, { foreignKey: 'idEnsayo' /* , sourceKey: 'idEnsayo' */ });
