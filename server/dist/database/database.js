"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('GISDB', //Data Base
'postgres', //user
'investigacion', //password
{
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    pool: {
        max: 5,
        idle: 1000
    },
    logging: false
});
