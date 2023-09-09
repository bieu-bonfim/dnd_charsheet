const express = require('express');
const Race = require('../models/Race');

const {
  getRace,
  createRace,
  deleteRace,
  getRaces,
  updateRaces,
  updateRace,
} = require('../controllers/raceController');
const { createCharacter } = require('../controllers/characterController');

const router = express.Router();

router.get('/', getRaces);
router.post('/', createRace);
router.get('/:id', getRace);
router.put('/:id', updateRace);
router.delete('/:id', deleteRace);

module.exports = router;