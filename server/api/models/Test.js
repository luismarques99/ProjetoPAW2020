const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestsSchema = new Schema({
	saude24: {
		type: Boolean,
		trim: true,
		required: true,
	},
	risk_group: {
		type: Boolean,
		trim: true,
		required: true,
	},
	risk_local: {
		type: Boolean,
		trim: true,
		required: true,
	},
	information: {
		type: String,
		trim: true,
	},
	user_state: {
		type: String,
		default: 'suspeito',
	},
	test_state: {
		type: String,
		default: 'pendente',
	},
	test_result: {
		type: String,
		default: null,
	},
	priority: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
	},
	// pdf: {
	// 	type: Array,
	// },
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	}
});
module.exports = mongoose.model('Testes', TestsSchema);
