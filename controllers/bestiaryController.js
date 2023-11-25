const asyncHandler = require('express-async-handler');
const Bestiary = require('../models/Bestiary');
const InvertedIndex = require('../models/InvertedIndex');


// ---------------------------- spell  ------------------------------
const getBestiaryEntries = asyncHandler(async(req, res) => {
    try {
      const entry = await Bestiary.find()
      res.send(entry)
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const createBestiaryEntry = asyncHandler(async(req, res) => {
try {
    const entry = await Bestiary.create(req.body);
    res.status(200).json(entry);

} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const getBestiary = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const entry = await Bestiary.findById(id);
      res.send(entry);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  

const updateBestiary = asyncHandler(async(req, res) => {
try {
    const {id} = req.params;
    const entry = await Bestiary.findByIdAndUpdate(id, req.body);
    if (!entry) {
    res.status(404);
    throw new Error(`Bestiarye com ID ${id} não encontrada`);
    }
    const updatedBestiary = await Bestiary.findById(id);
    res.status(200).json(updatedBestiary);
} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});

const deleteBestiary = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const entry = await Bestiary.findByIdAndDelete(id);
      if (!entry) {
        res.status(404);
        throw new Error(`Bestiarye com ID ${id} não encontrada`);
      }
      res.status(200).json(entry);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  
module.exports = {
getBestiaryEntries,
createBestiaryEntry,
getBestiary,
updateBestiary,
deleteBestiary
}