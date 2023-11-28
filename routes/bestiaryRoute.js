const express = require('express');

const {
    getBestiaryEntries,
    createBestiaryEntry,
    getBestiaryEntry,
    updateBestiaryEntry,
    deleteBestiaryEntry,
    searchBestiary,
    getSuggestions
} = require('../controllers/bestiaryController'); 

const router = express.Router();

router.get('/', getBestiaryEntries);
router.post('/', createBestiaryEntry);
router.get('/search', searchBestiary);
router.get('/suggest/:term', getSuggestions);
router.get('/:id', getBestiaryEntry);
router.put('/:id', updateBestiaryEntry);
router.delete('/:id', deleteBestiaryEntry);

module.exports = router;