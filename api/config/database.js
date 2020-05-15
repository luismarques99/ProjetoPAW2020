//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.Promise = global.Promise;
module.exports = mongoose;

mongoose
	.connect('mongodb://127.0.0.1:27017/covid-19', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => console.log('DB connected!'))
	.catch((err) => {
		console.log(`DB Connection Error: ${err.message}`);
	});
