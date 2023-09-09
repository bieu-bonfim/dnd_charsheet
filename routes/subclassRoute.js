const express = require('express');
const Subclass = require('../models/Subclass');

const {
    getSubclass,
    createSubclass,
    deleteSubclass,
    getSubclasses,
    updateSubclass,
} = require('../controllers/subclassController')

const router = express.Router();

router.get('/', getSubclasses);
router.post('/', createSubclass);
router.get('/:id', getSubclass);
router.put('/:id', updateSubclass);
router.delete('/:id', deleteSubclass);

module.exports = router;