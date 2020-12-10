require('dotenv').config();

const knex = require('knex');
const configuration = require('../../knexfile');

const connectionKnex = knex(configuration.development);

module.exports = connectionKnex;