import {DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/database';
import {EnsayoInterface} from '../interfaces/interfaces'
//El creation Attributes es primordia para que ande el .create en los controladores
interface EnsayoCreationAttributes extends Optional<EnsayoInterface, "idEnsayo">{};
export default class Ensayo extends Model<EnsayoInterface,EnsayoCreationAttributes>{};
import Ambiente from './Ambiente';
import Parametros from './Parametros';

Ensayo.init({
    idEnsayo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    radioTrayectoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    operador: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    observaciones: {
        type: DataTypes.TEXT,
    },
    diametroBola: {
        type: DataTypes.REAL,
        allowNull: false
    },
    distanciaTotal: {
        type: DataTypes.REAL,
        allowNull: true
    },
    carga: {
        type: DataTypes.REAL,
        allowNull: false
    },
    tiempoTotal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    materialBola: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    durezaProbeta: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    tratamientoProbeta: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    materialProbeta: {
        type: DataTypes.STRING(60),
        allowNull: true
    },
    codigoProbeta: {
        type: DataTypes.STRING(20),
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Ensayo', //nombre que tiene en la tabla de la DB
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});
//Cardinality with Ambiente
Ensayo.hasMany(Ambiente, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo' });
Ambiente.belongsTo(Ensayo, { foreignKey: 'idEnsayo'/* , sourceKey: 'idEnsayo' */ });

//Cardinality with Parametros
Ensayo.hasMany(Parametros, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo', as:'Parametros' });
Parametros.belongsTo(Ensayo, { foreignKey: 'idEnsayo'/* , sourceKey: 'idEnsayo' */ });

