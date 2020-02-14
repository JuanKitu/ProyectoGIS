  
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'GISDB',//Data Base
    'postgres',//user
    'investigacion',//password
    {
        host:'localhost',
        port:5432,
        dialect:'postgres',
        pool:{
            max:5,
            mix:0,
            require:30000,
            idle:1000
        },
        logging: false
    }
)

module.exports = {sequelize};