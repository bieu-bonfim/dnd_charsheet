const express = require('express');

const {
    getRoll
} = require('../controllers/diceRollController'); 

const router = express.Router();

router.get('/', getRoll);

module.exports = router;