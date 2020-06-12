const Test = require('../models/Test');
// const User = require('../models/User');

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
	Test.findByIdAndRemove(req.params.testesId, (err, testInfo) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'Teste apagado com sucesso!',
				data: testInfo,
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
};

// Update a test by id
testsController.updateById = (req, res, next) => {


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
					message: 'Testes nao encontrados com este id: ' + req.body.userId,
				});
			}
			return res.status(500).send({
				message: 'Erro com este id: ' + req.body.userId,
			});
		} else {
			res.json({
				status: 'Success',
				message: 'Testes encontrados!',
				data: testes,
			});
		}
	});
};

testsController.uploadFile = (req, res, next) => {};
module.exports = testsController;
