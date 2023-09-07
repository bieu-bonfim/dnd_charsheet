const express = require('express');
const Subrace = require('../models/Subrace');

const router = express.Router();

// --------------------------- subrace -------------------------------------

router.get('/', async(req, res) => {
  try {
    const subrace = await Subrace.find()
    res.send(subrace)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post('/', async(req, res) => {
  try {
    const subrace = await Subrace.create(req.body);
    res.status(200).json(subrace);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

router.get('//:id', async (req, res) => {
  try {
    const {id} = req.params;
    const subrace = await Subrace.findById(id);
    res.send(subrace);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.put('//:id', async(req, res) => {
  try {
    const {id} = req.params;
    const subrace = await Subrace.findByIdAndUpdate(id, req.body);
    if (!subrace) {
      return res.send(404)
      .json({message: `Sub raça com id: ${id} não encontrado`});
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
    const subrace = await Subrace.findByIdAndDelete(id);
    if (!subrace) {
      return res.send(404)
      .json({message: `Sub raça com id: ${id} não encontrado`});
    }
    res.status(200).json(subrace);
  } catch (error) {
    res.status(500).send(error.message);
  }
})


module.exports = router;