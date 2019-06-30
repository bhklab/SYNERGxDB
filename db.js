const ENV = process.env.ENV || 'development';

const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig[ENV]);

module.exports = db;
