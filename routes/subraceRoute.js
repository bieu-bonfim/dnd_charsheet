const express = require('express');
const Subrace = require('../models/Subrace');

const {
  getSubraces,
  createSubrace,
  deleteSubrace,
  getSubrace,
  updateSubrace
} = require('../controllers/subraceController')

const router = express.Router();

router.get('/', getSubraces);
router.post('/', createSubrace);
router.get('/:id', getSubrace);
router.put('/:id', updateSubrace);
router.delete('/:id', deleteSubrace);

module.exports = router;