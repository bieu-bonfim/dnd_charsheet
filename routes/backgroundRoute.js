const express = require('express');

const {
  getBackground,
  createBackground,
  deleteBackground,
  getBackgrounds,
  updateBackground,
} = require('../controllers/backgroundController');

const router = express.Router();

router.get('/', getBackgrounds);
router.post('/', createBackground);
router.get('/:id', getBackground);
router.put('/:id', updateBackground);
router.delete('/:id', deleteBackground);

module.exports = router;