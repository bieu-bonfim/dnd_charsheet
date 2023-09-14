const asyncHandler = require('express-async-handler');
const Subclass = require('../models/Subclass');


// ---------------------------- spell  ------------------------------
const getSubclasses = asyncHandler(async(req, res) => {
    try {
      const subclass = await Subclass.find()
      res.send(subclass)
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const createSubclass = asyncHandler(async(req, res) => {
try {
    const subclass = await Subclass.create(req.body);
    res.status(200).json(subclass);

} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});
  
const getSubclass = asyncHandler(async(req, res) => {
  try {
    const {id} = req.params;
    const subclass = await Subclass.findById(id);
    res.send(subclass);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
  
const getSubclassByClass = asyncHandler(async(req, res) => {
  try {
    const {name} = req.query;
    const subclass = await Subclass.find({"class": name});
    res.send(subclass);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateSubclass = asyncHandler(async(req, res) => {
try {
    const {id} = req.params;
    const subclass = await Subclass.findByIdAndUpdate(id, req.body);
    if (!subclass) {
    res.status(404);
    throw new Error(`Subclasse com ID ${id} não encontrada`);
    }
    const updatedSubclass = await Subclass.findById(id);
    res.status(200).json(updatedSubclass);
} catch (error) {
    res.status(500);
    throw new Error(error.message);
}
});

const deleteSubclass = asyncHandler(async(req, res) => {
    try {
      const {id} = req.params;
      const subclass = await Subclass.findByIdAndDelete(id);
      if (!subclass) {
        res.status(404);
        throw new Error(`Subclasse com ID ${id} não encontrada`);
      }
      res.status(200).json(subclass);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });
  
  
module.exports = {
getSubclasses,
createSubclass,
getSubclass,
updateSubclass,
deleteSubclass,
getSubclassByClass
}