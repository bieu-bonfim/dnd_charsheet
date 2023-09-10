const { ObjectId } = require('mongodb');
const asyncHandler = require('express-async-handler');
const Character = require('../models/Character');
const Class = require('../models/Class');
const Race = require('../models/Race');
const Subrace = require('../models/Subrace');
const Subclass = require('../models/Subclass');
const Spell = require('../models/Spell');
const Background = require('../models/Background');

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
    const charClass = await Class.findById(new ObjectId(character.class));
    const charRace = await Race.findById(new ObjectId(character.race));
    const charSubrace = await Subrace.findById(new ObjectId(character.subrace));
    const charSubclass = await Subclass.findById(new ObjectId(character.subclass));
    const charBackground = await Background.findById(new ObjectId(character.background));
    var charSpells = [];
    character.spells.forEach(async e => {
      const spellData = await Spell.findById(new ObjectId(e));
      charSpells.push(spellData);
    });
    res.send({
      character,
      class: charClass,
      race: charRace,
      subrace: charSubrace,
      subclass: charSubclass,
      spells: charSpells,
      background: charBackground
    });
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