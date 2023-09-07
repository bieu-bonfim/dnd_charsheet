const express = require('express');
const Spell = require('../models/Spell');

const router = express.Router();

// ------------------------------ feitiços -----------------------------------------
router.get('/', async(req, res) => {
  try {
    const spell  = await Spell.find()
    res.send(spell)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async(req, res) => {
  try {
    const spell = await Spell.create(req.body);
    res.status(200).json(spell);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

router.get('//:id', async (req, res) => {
  try {
    const {id} = req.params;
    const spell = await Spell.findById(id);
    res.send(spell);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.put('//:id', async(req, res) => {
  try {
    const {id} = req.params;
    const spell = await Spell.findByIdAndUpdate(id, req.body);
    if (!spell) {
      return res.send(404)
      .json({message: `Feitiço com id: ${id} não encontrado`});
    }
    const updatedSpell = await Spell.findById(id);
    res.status(200).json(updatedSpell)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete('//:id', async(req, res) => {
  try {
    const {id} = req.params;
    const spell = await Spell.findByIdAndDelete(id);
    if (!spell) {
      return res.send(404)
      .json({message: `Feitiço com id: ${id} não encontrado`});
    }
    res.status(200).json(spell);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = router;