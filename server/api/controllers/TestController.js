const Test = require('../models/Test');
const User = require('../models/User');

const testsController = {};

// Show single test by id
testsController.getById = (req, res, next) => {
	console.log(req.body);
	Test.findById(req.params.testesId, (err, testeInfo) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'Testes encontrado!',
				data: { testes: testeInfo },
			});
		}
	});
};

// List all tests
testsController.getAll = (req, res, next) => {
	Test.find({}, (err, testes) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'Testes listados!',
				data: { testes: testes },
			});
		}
	});
};

//List priority tests
testsController.getPriorityTests = (req, res, next) => {
	Test.find(
		{
			$and: [
				{ saude24: true },
				{ risk_local: true },
				{ risk_group: true },
				{ test_state: 'pendente' },
			],
		},
		(err, testes) => {
			if (err) {
				next(err);
			} else {
				res.json({
					status: 'Success',
					message: 'Testes listados!',
					data: { testes: testes },
				});
			}
		}
	);
};

//List pending tests
testsController.getPendingTests = (req, res, next) => {
	Test.find({ test_state: 'pendente' }, (err, testes) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'Testes listados!',
				data: { testes: testes },
			});
		}
	});
};

// Delete a test by id
testsController.deleteById = (req, res, next) => {
	Test.findByIdAndRemove(req.params.testesId, (err, testeInfo) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'Teste apagado com sucesso!',
				data: null,
			});
		}
	});
};

// Create a new test
testsController.create = (req, res, next) => {
	const test = new Test(req.body);

	test.save((err, result) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'Teste adicionado com sucesso!',
				data: result,
			});
		}
	});

	// Test.create(
	// 	{
	// 		saude24: req.body.saude24,
	// 		risk_group: req.body.risk_group,
	// 		risk_local: req.body.risk_local,
	// 		information: req.body.information,
	// 		user_state: req.body.user_state,
	// 		test_state: req.body.test_state,
	// 		test_result: req.body.test_result,

	// 		//pdf: req.files,
	// 		priority: req.body.priority,
	// 		date: req.body.date,
	// 		userId: req.body.userId,
	// 	},
	// 	(err, result) => {
	// 		if (err) {
	// 			console.log(err);
	// 			next(err);
	// 		} else {
	// 			res.json({
	// 				status: 'Success',
	// 				message: 'Teste adicionado com sucesso!',
	// 				data: result,
	// 			});
	// 		}
	// 	}
	// );
};

// Update a test by id
testsController.updateById = (req, res, next) => {
	// const reqFiles = [];
	// const url = req.protocol + '://' + req.get('host');
	// for (var i = 0; i < req.files.length; i++) {
	// 	reqFiles.push(url + '/public/' + req.files[i].filename);
	// }

	Test.findByIdAndUpdate(
		req.params.testesId,
		req.body,
		{ new: true },
		(err, testInfo) => {
			if (err) {
				next(err);
			} else {
				res.json({
					status: 'Success',
					message: 'Teste atualizado com sucesso!',
					data: testInfo,
				});
			}
		}
	);
};

// List all tests for a userId
testsController.getAllTesteUser = (req, res, next) => {
	Test.find({ userId: req.body.userId }).exec((err, testes) => {
		if (err) {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Testes nao encontrados com este id: 	' + req.body.userId,
				});
			}
			return res.status(500).send({
				message: 'Erro com este id: ' + req.params.userId,
			});
		} else {
			res.json({
				status: 'Success',
				message: 'Testes encontrados!',
				data: testes,
			});
		}
		// res.send(testes);
	});
};

testsController.uploadFile = (req, res, next) => { };
module.exports = testsController;