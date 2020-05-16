const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

const testes = require('./api/routes/testes');
const users = require('./api/routes/users');

const mongoose = require('./api/config/database'); //database configuration

const app = express();

const options = {
	// line 27
	swaggerDefinition: {
		info: {
			title: 'swagger-express-jsdoc', // Title (required)
			version: '1.0.1', // Version (required)
		},
		host: 'localhost:3000',
		basePath: '/',
	},
	apis: ['./users'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);

// connection to mongodb
// mongoose.connection.on(
// 	'error',
// 	console.error.bind(console, 'MongoDB connection error:')
// );

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


app
	.set('secretKey', 'Y{ca%n75U!_>,@c') // jwt secret token
	.use(logger('dev'))
	.get('/api-docs.json', function (req, res) {
		// line 41
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	})
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	.use(bodyParser.urlencoded({ extended: false }))
	.get('/', function (req, res) {
		res.json({ estado: 'ok' });
	})

	// public route
	.use('/users', users)

	// private route
	.use('/testes', validateUser, testes)
	.get('/favicon.ico', function (req, res) {
		res.sendStatus(204);
	})

	// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
	// handle 404 error
	.use(function (req, res, next) {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	})

	// handle errors
	.use(function (err, req, res, next) {
		console.log(err);

		if (err.status === 404) res.status(404).json({ message: 'Not found' });
		else res.status(500).json({ message: 'Something looks wrong :( !!!' });
	});

module.exports = app;
