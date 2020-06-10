const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const testsRouter = require('./api/routes/tests');
const usersRouter = require('./api/routes/users');

const mongoose = require('./api/config/database'); //database configuration

const app = express();


function validateUser(req, res, next) {
	jwt.verify(
		req.headers['x-access-token'],
		req.app.get('secretKey'),
		function (err, decoded) {
			if (err) {
				res.json({ status: 'error', message: err.message, data: null });
			} else {
				// add user id to request
				req.body.userId = decoded.id;
				next();
			}
		}
	);
}


app.set('secretKey', 'Y{ca%n75U!_>,@c') // jwt secret token

app.use(cors());

app.use('/public', express.static('public'));

app.use(logger('dev'))

app.use(express.json());

app.get('/api-docs.json', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.json({ estado: 'ok' });
});

// public route
app.use('/api/v1/users', usersRouter);

// private route
app.use('/api/v1/tests', validateUser, testsRouter);

app.get('/favicon.ico', function (req, res) {
	res.sendStatus(204);
});

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// handle errors
app.use(function (err, req, res, next) {
	console.log(err);

	if (err.status === 404) res.status(404).json({ message: 'Not found' });
	else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

module.exports = app;
