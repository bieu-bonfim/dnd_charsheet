const express = require('express');
const Character = require('../models/Character');

const router = express.Router();

// ----------------------------- character ----------------------------------------
router.get('', async(req, res) => {
  try {
    const character = await Character.find()
    res.send(character)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('', async(req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(200).json(character);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findById(id);
    res.send(character);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.put('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findByIdAndUpdate(id, req.body);
    if (!character) {
      return res.send(404)
      .json({message: `Personagem com id: ${id} não encontrado`});
    }
    const updatedCharacter = await Character.findById(id);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete('/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findByIdAndDelete(id);
    if (!character) {
      return res.send(404)
      .json({message: `Personagem com id: ${id} não encontrado`});
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = router;