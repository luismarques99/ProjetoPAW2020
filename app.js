const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

const testsRouter = require('./api/routes/tests');
const usersRouter = require('./api/routes/users');

const mongoose = require('./api/config/database'); //database configuration

const app = express();

// const swaggerOptions = {
// 	swaggerDefinition: {
// 		info: {
// 			title: 'Covid Tests Manager API',
// 			description: 'REST API Covid Tests Manager application\n\nGitHub Repository: https://github.com/LuisMarques99/ProjetoPAW2020\n\nAuthors:\nDiogo Costa: https://github.com/diogocosta4\nLuis Marques: https://github.com/LuisMarques99\nLuis Teixeira: https://github.com/luisteixeira92',
// 			version: '2.0.0',
// 			contact: {
// 				name: 'Grupo 39'
// 			}
// 		},
// 		host: 'localhost:3000',
// 		basePath: '/api/v1',
// 	},
// 	apis: [
// 		'app.js',
// 		'.api/routes/*.js'
// 	]
// };
// const swaggerDocs = swaggerJSDoc(swaggerOptions);


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
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
