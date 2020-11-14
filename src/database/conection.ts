const knex = require('knex');
const configuration = require('../../knexfile');
const conection = knex(configuration.conection);

export default conection;