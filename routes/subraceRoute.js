const express = require('express');

const {
  getSubraces,
  createSubrace,
  deleteSubrace,
  getSubrace,
  updateSubrace,
  getSubraceByRace
} = require('../controllers/subraceController')

const router = express.Router();

router.get('/', getSubraces);
router.get('/race', getSubraceByRace);
router.get('/:id', getSubrace);
router.post('/', createSubrace);
router.put('/:id', updateSubrace);
router.delete('/:id', deleteSubrace);

module.exports = router;