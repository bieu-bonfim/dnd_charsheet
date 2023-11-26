const express = require('express');

const {
    deleteAll,
    getInvertedIndexOfWord,
    getDocsWithWord
} = require('../controllers/invertedIndexController.js'); 

const router = express.Router();

router.delete('/', deleteAll);
router.get('/docs', getDocsWithWord);
router.get('/word', getInvertedIndexOfWord);

module.exports = router;