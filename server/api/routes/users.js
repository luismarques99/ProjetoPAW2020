const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router
	// Get all users
	.get('/', (req, res, next) => {
		userController.getAll(req, res, next);
	})

	// Get a user by its ID
	.get('/:userId', (req, res) => {
		userController.getById(req, res);
	})

	// Register a new user
	.post('/register', (req, res, next) => {
		userController.create(req, res, next);
	})

	// Login a user with jwt authentication
	.post('/login', (req, res, next) => {
		userController.authenticate(req, res, next);
	})

	// Delete a user
	.delete('/:userId', (req, res, next) => {
		userController.deleteById(req, res, next);
	})

	// Edit a user
	.put('/:userId', (req, res, next) => {
		userController.updateUserById(req, res, next);
	});

module.exports = router;
