const knex = require('knex');
const configuration = require('../../knexfile');
const conection = knex(configuration.conection);

module.exports = conection;