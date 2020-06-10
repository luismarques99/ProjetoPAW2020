const testsModel = require('../models/Test');
const userModel = require('../models/User');

const testsController = {};

// Show single test by id
testsController.getById = (req, res, next) => {
	console.log(req.body);
	testsModel.findById(req.params.testesId, (err, testeInfo) => {
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
	testsModel.find({}, (err, testes) => {
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
	testsModel.find(
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
	testsModel.find({ test_state: 'pendente' }, (err, testes) => {
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
	testsModel.findByIdAndRemove(req.params.testesId, (err, testeInfo) => {
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
	testsModel.create(
		{
			saude24: req.body.saude24,
			risk_group: req.body.risk_group,
			risk_local: req.body.risk_local,
			information: req.body.information,
			user_state: req.body.user_state,
			test_state: req.body.test_state,
			test_result: req.body.test_result,

			//pdf: req.files,
			priority: req.body.priority,
			date: req.body.date,
			userId: req.body.userId,
		},
		(err, result) => {
			if (err) {
				console.log(err);
				next(err);
			} else {
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
	/*const reqFiles = [];
	const url = req.protocol + '://' + req.get('host');
	for (var i = 0; i < req.files.length; i++) {
		reqFiles.push(url + '/public/' + req.files[i].filename);
	}
*/
	testsModel.findByIdAndUpdate(
		req.params.testesId,
		{
			saude24: req.body.saude24,
			risk_group: req.body.risk_group,
			risk_local: req.body.risk_local,
			information: req.body.information,
			user_state: req.body.user_state,
			test_state: req.body.test_state,
			test_result: req.body.test_result,
			date: req.body.date,
			//pdf: reqFiles,
			priority: req.body.priority,
		},
		// FIXME: testInfo é a informação atual da base de dados, o objetivo é mostrar no put a informação que foi alterada,
		// juntamente com o resto dos dados
		// ISTO TRADUZ-SE PARA O RSTO DOS UPDATES
		(err, testInfo) => {
			if (err) {
				next(err);
			} else {
				res.json(testInfo);
			}
		}
	);
};
// List all tests for a userId
testsController.getAllTesteUser = (req, res, next) => {
	testsModel.find({ userId: req.body.userId }).exec((err, testes) => {
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

testsController.uploadFile = (req, res, next) => {};
module.exports = testsController;
