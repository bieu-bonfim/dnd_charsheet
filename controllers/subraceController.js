const asyncHandler = require('express-async-handler');
const Subrace = require('../models/Subrace');

// ---------------------------- spell  ------------------------------
const getSubraces = asyncHandler(async(req, res) => {
    try {
      const subrace = await Subrace.find()
      res.send(subrace)
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const createSubrace = asyncHandler(async(req, res) => {
try {
    const subrace = await Subrace.create(req.body);
    res.status(200).json(subrace);

} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});

const getSubrace = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const spell = await Spell.findById(id);
      res.send(spell);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const updateSubrace = asyncHandler(async(req, res) => {
try {
    const {id} = req.params;
    const subrace = await Subrace.findByIdAndUpdate(id, req.body);
    if (!subrace) {
    res.status(404);
    throw new Error(`Feitiço com ID ${id} não encontrado`);
    }
    const updatedSubrace = await Subrace.findById(id);
    res.status(200).json(updatedSubrace);
} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});

const deleteSubrace = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const subrace = await Subrace.findByIdAndDelete(id);
      if (!subrace) {
        res.status(404);
        throw new Error(`Feitiço com ID ${id} não encontrado`);
      }
      res.status(200).json(subrace);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

  module.exports = {
    getSubraces,
    createSubrace,
    getSubrace,
    updateSubrace,
    deleteSubrace
  }
  