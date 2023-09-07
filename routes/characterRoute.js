const express = require('express');
const Character = require('../models/Character');
const {
  getCharacter, 
  createCharacter, 
  deleteCharacter, 
  getCharacters, 
  updateCharacter
} = require('../controllers/characterController');

const router = express.Router();

// ----------------------------- character ----------------------------------------
router.get('/', getCharacters);
router.post('/', createCharacter);
router.get('/:id', getCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;