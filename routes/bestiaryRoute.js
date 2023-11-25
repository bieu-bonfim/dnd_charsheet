const express = require('express');

const {
    getBestiaryEntries,
    createBestiaryEntry,
    getBestiaryEntry,
    updateBestiaryEntry,
    deleteBestiaryEntry
} = require('../controllers/bestiaryController'); 

const router = express.Router();

router.get('/', getBestiaryEntries);
router.post('/', createBestiaryEntry);
router.get('/:id', getBestiaryEntry);
router.put('/:id', updateBestiaryEntry);
router.delete('/:id', deleteBestiaryEntry);

module.exports = router;