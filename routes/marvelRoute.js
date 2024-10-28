const express = require('express');
const marvelController = require('../controllers/marvelController');
const marvelValidator = require('../validators/marvelValidator');

const router = express.Router();

// Create marvel-hero with validation
router.post('/', marvelValidator.validateMarvel, marvelController.createMarvel);

// Read all marvel-heroes
router.get('/', marvelController.getAllMarvel);

// Read one marvel-hero by ID
router.get('/:id', marvelController.getMarvelById);

// Update marvel-hero with validation
router.put('/:id', marvelValidator.validateMarvel, marvelController.updateMarvel);

// Delete marvel-hero
router.delete('/:id', marvelController.deleteMarvel);

module.exports = router;