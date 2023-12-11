const express = require('express');

const {
    getRoll,
    saveRoll
} = require('../controllers/diceRollController'); 

const router = express.Router();

router.get('/', getRoll);
router.post('/', saveRoll);

module.exports = router;