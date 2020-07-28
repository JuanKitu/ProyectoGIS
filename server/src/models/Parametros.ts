import {DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/database';
import {ParametroInterface} from '../interfaces/interfaces'
//El creation Attributes es primordia para que ande el .create en los controladores
interface ParametroCreationAttributes extends Optional<ParametroInterface, "idParametro">{};
export default class Parametros extends Model<ParametroInterface,ParametroCreationAttributes>{};
Parametros.init({
    fuerzaRozamiento: {
        type: DataTypes.REAL,
        allowNull: false
    },
    coeficienteRozamiento: {
        type: DataTypes.REAL,
        allowNull: false
    },
    vueltas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idParametro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tiempoActual: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEnsayo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Parametros', //nombre que tiene en la tabla de la DB
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});