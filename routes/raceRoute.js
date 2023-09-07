const express = require('express');
const Race = require('../models/Race');

const router = express.Router();

// --------------------------- race -------------------------------------
router.get('/', async(req, res) => {
  try {
    const race = await Race.find()
    res.send(race)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async(req, res) => {
  try {
    const race = await Race.create(req.body);
    res.status(200).json(race);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

router.get('//:id', async (req, res) => {
  try {
    const {id} = req.params;
    const race = await Race.findById(id);
    res.send(race);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.put('//:id', async(req, res) => {
  try {
    const {id} = req.params;
    const race = await Race.findByIdAndUpdate(id, req.body);
    if (!race) {
      return res.send(404)
      .json({message: `Raça com id: ${id} não encontrado`});
    }
    const updatedRace = await Race.findById(id);
    res.status(200).json(updatedRace)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete('//:id', async(req, res) => {
  try {
    const {id} = req.params;
    const race = await Race.findByIdAndDelete(id);
    if (!race) {
      return res.send(404)
      .json({message: `Raça com id: ${id} não encontrado`});
    }
    res.status(200).json(race);
  } catch (error) {
    res.status(500).send(error.message);
  }
})



module.exports = router;