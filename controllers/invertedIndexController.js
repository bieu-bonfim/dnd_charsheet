const asyncHandler = require("express-async-handler");
const Class = require("../models/Class");
const InvertedIndex = require("../models/InvertedIndex");
const Bestiary = require("../models/Bestiary");

// ---------------------------- spell  ------------------------------

function calculateTFIDF() {}

const getTotalWords = async (doc) => {
  const entry = await Bestiary.findById(doc);
  if (entry) {
    return entry.words;
  }
  return 0;
};

const getInvertedIndexOfWord = async (word) => {
  try {
    const invIndex = await InvertedIndex.find({ word: word });
    res.send(invIndex);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};




const getDocsWithWord = async (word) => {
  let result = [];
  const invIndex = await InvertedIndex.find({ word: word });
  if (invIndex[0]) {
    const unique = Array.from(
      new Set(invIndex[0].entries.map((item) => item.doc.toString()))
    );
    const documents = await Bestiary.count();
    const idf = Math.log(documents / unique.length);
    for (const doc of unique) {
      const entrylist = invIndex[0].entries.filter(
        (obj) => obj.doc.toString() === doc
      );
      const count = entrylist.length;
      const positions = entrylist.map(entry => entry.pos);
      const total = await getTotalWords(doc);
      const tf = count / total;
      const tfidf = tf * idf; 
      result.push({ doc, tfidf, positions });
    }
  }
  return { word: word, result };
};

const getWordsFromDoc = asyncHandler(async (req, res) => {
  try {
    // const {word} = req.query;
    // const invIndex = await InvertedIndex.find({ word: word });
    // let result = invIndex[0].entries.map(({ doc }) => doc);
    // res.send(result);
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
  invIndex[0].entries.push({ doc: id, pos: pos });
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
  getDocsWithWord,
  getWordsFromDoc,
  // getInvertedIndexOfDocument,
  // getInvertedIndexes
};
