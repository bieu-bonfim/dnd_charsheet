const express = require('express');

const {
    getClass,
    createClass,
    deleteClass,
    getClasses,
    updateClass
} = require('../controllers/classController'); 

const router = express.Router();

router.get('/', getClasses);
router.post('/', createClass);
router.get('/:id', getClass);
router.put('/:id', updateClass);
router.delete('/:id', deleteClass);

module.exports = router;