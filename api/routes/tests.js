const express = require('express');
const router = express.Router();
const testsController = require('../controllers/TestController');

router
    // List all tests
    .get('/', (req, res, next) => {
        testsController.getAll(req, res, next);
    })

    // Get a single test by id
    .get('/:testesId', (req, res, next) => {
        testsController.getById(req, res, next);
    })

    // Get all tests for a userId
    .get('/:userId', (req, res, next) => {
        testsController.getAllTesteUser(req, res, next);
    })

    // Create a new test
    .post('/', (req, res, next) => {
        testsController.create(req, res, next);
    })

    // Edit a test by id
    .put('/:testesId', (req, res, next) => {
        testsController.updateById(req, res, next);
    })

    // Delete a test by id
    .delete('/:testesId', (req, res, next) => {
        testsController.deleteById(req, res, next);
    });

module.exports = router;
