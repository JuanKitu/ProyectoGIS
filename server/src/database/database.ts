  
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'GISDB',//Data Base
    'postgres',//user
    'investigacion',//password
    {
        host:'localhost',
        port:5433,
        dialect:'postgres',
        logging: false
    }
)