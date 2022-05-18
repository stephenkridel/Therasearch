const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({ response: 'Hello World' });
});

app.listen(3000, () => {
	console.log('Listening...');
});
