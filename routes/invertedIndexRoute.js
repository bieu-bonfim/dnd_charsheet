const express = require('express');

const {
    deleteAll,
    getInvertedIndexOfWord
} = require('../controllers/invertedIndexController.js'); 

const router = express.Router();

router.delete('/', deleteAll);
router.get('/word', getInvertedIndexOfWord);

module.exports = router;