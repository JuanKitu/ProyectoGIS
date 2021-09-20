import {DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/database';
import {EnsayoInterface} from '../interfaces/interfaces'
import Ambientes_Archivados from './Ambientes_archivados';
import Parametros_Archivados from './Parametros_archivados';
//El creation Attributes es primordia para que ande el .create en los controladores

interface EnsayoCreationAttributes extends Optional<EnsayoInterface, "idEnsayo">{};
export default class Ensayo_Archivados extends Model<EnsayoInterface,EnsayoCreationAttributes> implements EnsayoInterface{
    public operador!:string;
    public distanciaTotal!:number;
    public radioTrayectoria!:number;
    public materialBola!:string;
    public carga!:number;
    public diametroBola!:number;
    public codigoProbeta!:string;
    public durezaProbeta!:number;
    public tratamientoProbeta!:string;
    public materialProbeta!:string;
    public idEnsayo!:number;
    public fecha!:string;
    public idDato!:number;
    public tiempoTotal!:number;
    public observaciones!:string;
};
//const Ambiente = require('./Ambiente');

Ensayo_Archivados.init({
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
    modelName: 'Ensayo_Archivados',
    timestamps: false,
    freezeTableName: true, //this is so that sequelize does not pluralize the table
});

//Cardinality with Ambiente
Ensayo_Archivados.hasMany(Ambientes_Archivados, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo', as:'Ambientes_Archivados' });
Ambientes_Archivados.belongsTo(Ensayo_Archivados, { foreignKey: 'idEnsayo', });

//Cardinality with Parametros
Ensayo_Archivados.hasMany(Parametros_Archivados, { foreignKey: 'idEnsayo', sourceKey: 'idEnsayo', as:'Parametros_Archivados' });
Parametros_Archivados.belongsTo(Ensayo_Archivados, { foreignKey: 'idEnsayo', });

