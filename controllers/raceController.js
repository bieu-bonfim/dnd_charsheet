const asyncHandler = require('express-async-handler');
const Race = require('../models/Race');


// --------------------------- race -------------------------------------
const getRaces = asyncHandler(async(req, res) => {
    try {
      const race = await Race.find()
      res.send(race)
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
const createRace = asyncHandler(async(req, res) => {
try {
    const race = await Race.create(req.body);
    res.status(200).json(race);

} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const getRace = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const race = await Race.findById(id);
      res.send(race);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
const updateRace = asyncHandler(async(req, res) => {
try {
    const {id} = req.params;
    const race = await Race.findByIdAndUpdate(id, req.body);
    if (!race) {
    res.status(404);
    throw new Error(`Raça com ID ${id} não encontrada`);
    }
    const updatedRace = await Race.findById(id);
    res.status(200).json(updatedRace);
} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const deleteRace = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const race = await Race.findByIdAndDelete(id);
      if (!race) {
        res.status(404);
        throw new Error(`Raça com ID ${id} não encontrada`);
      }
      res.status(200).json(race);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  
  
  module.exports = {
    getRaces,
    createRace,
    getRace,
    updateRace,
    deleteRace,
  }