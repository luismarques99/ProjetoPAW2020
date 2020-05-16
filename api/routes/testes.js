const express = require('express');
const router = express.Router();
const testesController = require('../controllers/TesteController');
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

router
    // List all tests
    .get('/', (req, res, next) => {
        testesController.getAll(req, res, next);
    })

    // Get a single test by id
    .get('/:testesId', (req, res, next) => {
        testesController.getById(req, res, next);
    })

    // Get all tests for a userId
    .get('/:userId', (req, res, next) => {
        testesController.getAllTesteUser(req, res, next);
    })

    // Create a new test
    .post('/', (req, res, next) => {
        testesController.create(req, res, next);
    })

    // Edit a test by id
    .put('/:testesId', (req, res, next) => {
        testesController.updateById(req, res, next);
    })

    // Delete a test by id
    .delete('/:testesId', (req, res, next) => {
        testesController.deleteById(req, res, next);
    });

module.exports = router;
