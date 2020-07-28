import {DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/database';
import {UsuarioInterface} from '../interfaces/interfaces'
//El creation Attributes es primordia para que ande el .create en los controladores
interface UsuarioCreationAttributes extends Optional<UsuarioInterface, "idUsuario">{};
export default class Usuario extends Model<UsuarioInterface,UsuarioCreationAttributes>{};

Usuario.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    legajo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Usuario', //nombre que tiene en la tabla de la DB
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

module.exports = Usuario;