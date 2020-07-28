  
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'GISDB',//Data Base
    'postgres',//user
    'investigacion',//password
    {
        host:'localhost',
        port:5433,
        dialect:'postgres',
        pool:{
            max:5,
            idle:1000
        },
        logging: false
    }
)