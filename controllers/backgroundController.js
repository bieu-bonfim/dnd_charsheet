const asyncHandler = require('express-async-handler');
const Background  = require('../models/Background');


// --------------------------- race -------------------------------------
const getBackgrounds = asyncHandler(async(req, res) => {
    try {
      const background = await Background.find()
      res.send(background)
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const createBackground = asyncHandler(async(req, res) => {
try {
    const background = await Background.create(req.body);
    res.status(200).json(background);

} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const getBackground = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const background = await Background.findById(id);
      res.send(background);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
const updateBackground = asyncHandler(async(req, res) => {
try {
    const {id} = req.params;
    const background = await Background.findByIdAndUpdate(id, req.body);
    if (!background) {
    res.status(404);
    throw new Error(`Background com ID ${id} não encontrado`);
    }
    const updatedBackground = await Background.findById(id);
    res.status(200).json(updatedBackground);
} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const deleteBackground = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const background = await Background.findByIdAndDelete(id);
      if (!background) {
        res.status(404);
        throw new Error(`Background com ID ${id} não encontrado`);
      }
      res.status(200).json(background);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  
  
  module.exports = {
    getBackgrounds,
    createBackground,
    getBackground,
    updateBackground,
    deleteBackground,
  }