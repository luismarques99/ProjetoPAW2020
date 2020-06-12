const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const userController = {};

// Create a new user
userController.create = (req, res, next) => {
	const user = new User(req.body);

	user.save((err, result) => {
		if (err) {
			next(err);
		} else {
			res.json({
				status: 'Success',
				message: 'User added successfully!',
				data: result,
			});
		}
	});
};

// User login with jwt authentication
userController.authenticate = (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, userInfo) => {
		if (err) {
			next(err);
		} else {
			if (userInfo) {
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
	User.findByIdAndRemove(req.params.userId, (err, userInfo) => {
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
	User.findByIdAndUpdate(
		req.params.userId,
		(() => {
			if (req.body.password != null) {
				return {
					name: req.body.name,
					email: req.body.email,
					password: bcrypt.hashSync(req.body.password, saltRounds)
				}
			} else {
				return req.body
			}
		})(),
		{ new: true },
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
	User.find({}, (err, users) => {
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
	User.findOne({ _id: req.params.userId }).exec((err, user) => {
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
