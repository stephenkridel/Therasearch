const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./db');

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});

async function insertData(name, occupation) {
	try {
		await pool.query(
			"INSERT INTO therapists (name, occupation) VALUES ($1, $2)",
			[name, occupation]
		);
	} catch (error) {
		throw(error);
	}
}

async function getData() {
	const res = await pool.query("SELECT * FROM therapists");
	return res;
}

app.get('/', (req, res) => {
	res.json({ response: 'This is the root' });
});

app.get('/query', async (req, res) => {
	const data = await getData();
	res.send(data);
});

app.get('/query/:name', async (req, res) => {
	const data = await pool.query('SELECT * FROM therapists WHERE name=$1', [req.params.name]);
	res.send(data);
});

app.post('/query', async (req, res) => {
	await insertData(req.params.name, req.params.occupation);
	res.send('Inserted therapist into database');
});

app.listen(PORT, () => {
	console.log('Listening...');
});
