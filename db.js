const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
	user: 'stephen',
	database: 'providers',
	password: process.env.DB_PW,
	port: 5432,
	host: 'localhost'
});

module.exports = { pool };
