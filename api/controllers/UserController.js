const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

// Create a new user
userController.create = (req, res, next) => {
	userModel.create(
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		},
		(err, result) => {
			if (err) {
				next(err);
			} else {
				res.json({
					status: 'Success',
					message: 'User added successfully!',
					data: result,
				});
			}
		}
	);
};

// User login with jwt authentication
userController.authenticate = (req, res, next) => {
	userModel.findOne({ email: req.body.email }, (err, userInfo) => {
		if (err) {
			next(err);
		} else {
			if (userInfo)
				if (bcrypt.compareSync(req.body.password, userInfo.password)) {
					const token = jwt.sign(
						{ id: userInfo._id },
						req.app.get('secretKey'),
						{ expiresIn: '1h' }
					);
					res.json({
						status: 'Success',
						message: 'user found!',
						data: { user: userInfo, token: token },
					});
				} else {
					res.json({
						status: 'Error',
						message: 'Invalid email/password!',
						data: null,
					});
				}
			else {
				res.json({
					status: 'Error',
					message: 'Invalid email/password!',
					data: null,
				});
			}
		}
	});
};

// Delete a user
userController.deleteById = (req, res, next) => {
	userModel.findByIdAndRemove(req.params.userId, (err, userInfo) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'Utilizador apagado com sucesso!',
				data: null,
			});
		}
	});
};

// Edit a user
userController.updateUserById = (req, res, next) => {
	userModel.findByIdAndUpdate(
		req.params.userId,
		{
			name: req.body.name,
			email: req.body.email,
			// FIXME: a password nao esta a ser editada corretamente, nao esta a ser encriptada antes de ser enviada para a BD
			// password: req.body.password
		},
		(err, userInfo) => {
			if (err) {
				next(err);
			} else {
				res.json({
					status: 'Success',
					message: 'Utilizador atualizado com sucesso!',
					data: userInfo,
				});
			}
		}
	);
};

// List all users
userController.getAll = (req, res, next) => {
	let userList = [];
	userModel.find({}, (err, users) => {
		if (err) {
			next(err);
		} else {
			for (let user of users) {
				userList.push({
					id: user._id,
					name: user.name,
					email: user.email,
				});
			}
			res.json({
				status: 'Success',
				message: 'Utilizadores listados!',
				data: { users: userList },
			});
		}
	});
};

// Show user by id
userController.getById = (req, res) => {
	userModel.findOne({ _id: req.params.userId }).exec((err, user) => {
		if (err) {
			console.log(`Error: ${err}`);
		} else {
			let userInfo = {};
			userInfo.id = user._id;
			userInfo.name = user.name;
			userInfo.email = user.email;
			res.json({
				status: 'Success',
				message: 'Utilizador listado!',
				data: { user: userInfo },
			});
		}
	});
};

module.exports = userController;
