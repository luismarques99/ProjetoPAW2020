const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns all users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get('/', userController.getAll);
router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.delete('/:userId', userController.deleteById);
router.put('/:userId', userController.updateuserById);

module.exports = router;
