const express = require('express');
const bodyParser = require('body-parser');
const { pool } = require('./db');

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

async function insertData(name, occupation) {
	await pool.query(
		"INSERT INTO therapists (name, occupation) VALUES ($1, $2)",
		[name, occupation]
	);
}

async function getData() {
	const res = await pool.query("SELECT * FROM therapists");
	return res;
}

app.get('/', (req, res) => {
	res.json({ response: 'This is the root' });
});

app.get('/query/:name-:occupation', async (req, res) => {
	const data = await getData();
	res.send(data);
});

app.post('/query', async (req, res) => {
	await insertData(req.params.name, req.params.occupation);
	res.send('Inserted therapist into data base');
});

app.listen(PORT, () => {
	console.log('Listening...');
});
