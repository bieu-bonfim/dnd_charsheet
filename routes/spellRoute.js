const express = require('express');
const Spell = require('../models/Spell');

const {
  getSpell,
  createSpell,
  deleteSpell,
  getSpells,
  getSpellsClass,
  updateSpell,
} = require('../controllers/spellController');

const router = express.Router();

router.get('/', getSpells);
router.get('/class', getSpellsClass);
router.post('/', createSpell);
router.get('/:id', getSpell);
router.put('/:id', updateSpell);
router.delete('/:id', deleteSpell);

module.exports = router;