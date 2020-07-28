import {DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/database';
import {AmbienteInterface} from '../interfaces/interfaces'
//El creation Attributes es primordia para que ande el .create en los controladores
interface AmbienteCreationAttributes extends Optional<AmbienteInterface, "idAmbiente">{};
export default class Ambiente extends Model<AmbienteInterface,AmbienteCreationAttributes>{};

Ambiente.init({
    temperatura: {
        type: DataTypes.REAL,
        allowNull: false
    },
    humedad: {
        type: DataTypes.REAL,
        allowNull: false
    },
    horaActual: {
        type: DataTypes.TIME,
        allowNull: false
    },
    idAmbiente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idEnsayo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ambiente', //nombre que tiene en la tabla de la DB
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
  });