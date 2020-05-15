const testesModel = require('../../models/testes');
const userModel = require('../../models/users');
module.exports = {
	getById: function (req, res, next) {
		console.log(req.body);
		testesModel.findById(req.params.testesId, function (err, testeInfo) {
			if (err) {
				next(err);
			} else {
				res.json({
					status: 'success',
					message: 'Testes encontrado!!!',
					data: { testes: testeInfo },
				});
			}
		});
	},

	getAll: function (req, res, next) {
		testesModel.find({}, function (err, testes) {
			if (err) {
				next(err);
			} else {
				res.json({
					status: 'success',
					message: 'Testes  Listados!!!',
					data: { testes: testes },
				});
			}
		});
	},

	deleteById: function (req, res, next) {
		testesModel.findByIdAndRemove(req.params.testesId, function (
			err,
			testeInfo
		) {
			if (err) next(err);
			else {
				res.json({
					status: 'success',
					message: 'Teste apagado com sucesso!!!',
					data: null,
				});
			}
		});
	},
	create: function (req, res, next) {
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
			function (err, result) {
				if (err) {
					console.log(err);
					next(err);
				} else
					res.json({
						status: 'success',
						message: 'Teste adicionado com sucesso!!!',
						data: result,
					});
			}
		);
	},

	updateById: function (req, res, next) {
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
			function (err, testesInfo) {
				if (err) next(err);
				else {
					res.json({
						status: 'success',
						message: 'Teste atualizado com sucesso!!!',
						data: null,
					});
				}
			}
		);
	},

	getAllTesteUser: function (req, res, next) {
		testesModel
			.findById({ userId: req.params.userId })
			.exec(function (err, testes) {
				if (err) {
					if (err.kind === 'ObjectId') {
						return res.status(404).send({
							message:
								'Testes nao encontrados com este id' +
								req.body.userId,
						});
					}
					return res.status(500).send({
						message: 'Erro com este id: ' + req.params.userId,
					});
				}

				res.send(testes);
			});
	},
};
