const testesModel = require('../models/Teste');
const userModel = require('../models/User');

const testsController = {};

// Show single test by id
testsController.getById = (req, res, next) => {
	console.log(req.body);
	testesModel.findById(req.params.testesId, (err, testeInfo) => {
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
	testesModel.find({}, (err, testes) => {
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
	testesModel.findByIdAndRemove(req.params.testesId, (err, testeInfo) => {
		if (err) {
			next(err);
		}
		else {
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
	testesModel.create(
		{
			saude24: req.body.saude24,
			risk_group: req.body.risk_group,
			risk_local: req.body.risk_local,
			information: req.body.information,
			user_state: req.body.user_state,
			test_state: req.body.test_state,
			test_result: req.body.test_result,
			priority: req.body.priority,
			userId: req.body.userId,
		},
		(err, result) => {
			if (err) {
				console.log(err);
				next(err);
			}
			else {
				res.json({
					status: 'Success',
					message: 'Teste adicionado com sucesso!',
					data: result,
				});
			}
		}
	);
};

// Update a test by id
testsController.updateById = (req, res, next) => {
	userModel.findByIdAndUpdate(
		req.params.testesId,
		{
			saude24: req.body.information,
			risk_group: req.body.risk_group,
			risk_local: req.body.risk_local,
			information: req.body.information,
			user_state: req.body.user_state,
			test_state: req.body.test_state,
			test_result: req.body.test_result,
			priority: req.body.priority,
		},
		(err, testesInfo) => {
			if (err) {
				next(err);
			}
			else {
				res.json({
					status: 'Success',
					message: 'Teste atualizado com sucesso!',
					data: null,
				});
			}
		}
	);
};

// List all tests for a userId
testsController.getAllTesteUser = (req, res, next) => {
	testesModel
		.findById({ userId: req.params.userId })
		.exec((err, testes) => {
			if (err) {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message:
							'Testes nao encontrados com este id!' +
							req.body.userId,
					});
				}
				return res.status(500).send({
					message: 'Erro com este id: ' + req.params.userId,
				});
			}

			res.send(testes);
		});
};