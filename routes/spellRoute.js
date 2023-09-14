const express = require('express');
const Spell = require('../models/Spell');

const {
  getSpell,
  createSpell,
  deleteSpell,
  getSpells,
  getSpellsByClass,
  updateSpell,
} = require('../controllers/spellController');

const router = express.Router();

router.get('/', getSpells);
router.get('/class', getSpellsByClass);
router.post('/', createSpell);
router.get('/:id', getSpell);
router.put('/:id', updateSpell);
router.delete('/:id', deleteSpell);

module.exports = router;