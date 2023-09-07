const asyncHandler = require('express-async-handler');
const Character = require('../models/Character');

const getCharacters = asyncHandler(async(req, res) => {
  try {
    const character = await Character.find()
    res.send(character)
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createCharacter = asyncHandler(async(req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(200).json(character);

  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getCharacter = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findById(id);
    res.send(character);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateCharacter = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findByIdAndUpdate(id, req.body);
    if (!character) {
      res.status(404);
      throw new Error(`Personagem com ID ${id} não encontrado`);
    }
    const updatedCharacter = await Character.findById(id);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteCharacter = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findByIdAndDelete(id);
    if (!character) {
      res.status(404);
      throw new Error(`Personagem com ID ${id} não encontrado`);
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getCharacters,
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
}