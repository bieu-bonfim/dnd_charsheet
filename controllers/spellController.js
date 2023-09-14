const asyncHandler = require('express-async-handler');
const Spell = require('../models/Spell');


// ---------------------------- spell  ------------------------------
const getSpells = asyncHandler(async(req, res) => {
    try {
      const spell = await Spell.find().sort({"level": 1});
      res.send(spell);  
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const getSpellsByClass = asyncHandler(async(req, res) => {
  try {
    const {name} = req.query;
    const spell = await Spell
    .find({"classes.fromClassList.name": name})
    .sort({"level": 1});
    res.send(spell)
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createSpell = asyncHandler(async(req, res) => {
try {
    const spell = await Spell.create(req.body);
    res.status(200).json(spell);

} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const getSpell = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const spell = await Spell.findById(id);
      res.send(spell);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  

const updateSpell = asyncHandler(async(req, res) => {
try {
    const {id} = req.params;
    const spell = await Spell.findByIdAndUpdate(id, req.body);
    if (!spell) {
    res.status(404);
    throw new Error(`Feitiço com ID ${id} não encontrado`);
    }
    const updatedSpell = await Spell.findById(id);
    res.status(200).json(updatedSpell);
} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});

const deleteSpell = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const spell = await Spell.findByIdAndDelete(id);
      if (!spell) {
        res.status(404);
        throw new Error(`Feitiço com ID ${id} não encontrado`);
      }
      res.status(200).json(spell);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  
module.exports = {
getSpells,
getSpellsByClass,
createSpell,
getSpell,
updateSpell,
deleteSpell
}