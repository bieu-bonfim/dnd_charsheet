const asyncHandler = require('express-async-handler');
const Class = require('../models/Class');


// ---------------------------- spell  ------------------------------
const getClasses = asyncHandler(async(req, res) => {
    try {
      const classe = await Class.find()
      res.send(classe)
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const createClass = asyncHandler(async(req, res) => {
try {
    const classe = await Class.create(req.body);
    res.status(200).json(classe);

} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const getClass = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const classe = await Class.findById(id);
      res.send(classe);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  

const updateClass = asyncHandler(async(req, res) => {
try {
    const {id} = req.params;
    const classe = await Class.findByIdAndUpdate(id, req.body);
    if (!classe) {
    res.status(404);
    throw new Error(`Classe com ID ${id} não encontrada`);
    }
    const updatedClass = await Class.findById(id);
    res.status(200).json(updatedClass);
} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});

const deleteClass = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const classe = await Class.findByIdAndDelete(id);
      if (!classe) {
        res.status(404);
        throw new Error(`Classe com ID ${id} não encontrada`);
      }
      res.status(200).json(classe);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  
module.exports = {
getClasses,
createClass,
getClass,
updateClass,
deleteClass
}