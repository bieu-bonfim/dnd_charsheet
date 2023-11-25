const express = require('express');

const {
    getSubclass,
    createSubclass,
    deleteSubclass,
    getSubclasses,
    updateSubclass,
    getSubclassByClass,
} = require('../controllers/subclassController')

const router = express.Router();

router.get('/', getSubclasses);
router.get('/class', getSubclassByClass);
router.get('/:id', getSubclass);
router.put('/:id', updateSubclass);
router.delete('/:id', deleteSubclass);
router.post('/', createSubclass);

module.exports = router;