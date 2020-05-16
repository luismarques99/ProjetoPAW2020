require('dotenv').config()

//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MONGO_DB_HOST = process.env.MONGO_DB_HOST || 'localhost';
const MONGO_DB_PORT = process.env.MONGO_DB_PORT || 27017;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'covid-19'

mongoose
	.connect(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
	.then(() => {
		console.log('Connected to MongoDB!')
	})
	.catch((err) => {
		console.log(`MongoDB Connection Error: ${err.message}`);
	});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;