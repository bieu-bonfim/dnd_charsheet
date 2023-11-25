const asyncHandler = require("express-async-handler");
const Class = require("../models/Class");
const InvertedIndex = require("../models/InvertedIndex");

// ---------------------------- spell  ------------------------------
const getClasses = asyncHandler(async (req, res) => {
  try {
    const classe = await Class.find();
    res.send(classe);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createClass = asyncHandler(async (req, res) => {
  try {
    const classe = await Class.create(req.body);
    res.status(200).json(classe);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getInvertedIndexOfWord = asyncHandler(async (req, res) => {
  try {
    const {word} = req.query;
    const invIndex = await InvertedIndex.find({ word: word });
    res.send(invIndex);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createForNewWord = async (word) => {
  const invIndex = await InvertedIndex.create({ word: word });
  return invIndex._id;
};

const checkIfWordExists = async (word) => {
  const invIndex = await InvertedIndex.find({ word: word });
  if (invIndex[0] == null) {
    return false;
  }
  return true;
};

const updateExistingWord = async (word, id, pos) => {
  const invIndex = await InvertedIndex.find({ word: word });
  invIndex[0].entries.push({"doc": id, "pos": pos});
  await InvertedIndex.findOneAndUpdate(
    { word: word },
    { entries: invIndex[0].entries }
  );
};

const deleteAll = asyncHandler(async (req, res) => {
  try {
    const invIndex = await InvertedIndex.deleteMany(
      {},
      console.log("indices invertidos apagados")
    );
    res.status(200).json(invIndex);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createForNewWord,
  updateExistingWord,
  checkIfWordExists,
  deleteAll,
  getInvertedIndexOfWord,
  // getInvertedIndexOfDocument,
  // getInvertedIndexes
};
