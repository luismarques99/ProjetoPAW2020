const express = require('express');
const router = express.Router();
const testesController = require('../controllers/controllers/testes');
/**
 * @swagger
 * /products:
 *   get:
 *     description: Returns all tests
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: testes
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Teste'
 */

router.get('/', testesController.getAll);
router.get('/:testesId', testesController.getById);
router.get('/:userId', testesController.getAllTesteUser);
router.post('/', testesController.create);
router.put('/:testesId', testesController.updateById);
router.delete('/:testesId', testesController.deleteById);
module.exports = router;
