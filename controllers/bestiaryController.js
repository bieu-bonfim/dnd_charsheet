const asyncHandler = require("express-async-handler");
const Bestiary = require("../models/Bestiary");
const InvertedIndex = require("../models/InvertedIndex");
const {
  createForNewWord,
  updateExistingWord,
  checkIfWordExists,
} = require("./invertedIndexController.js");
const natural = require("natural");
const stemmer = natural.PorterStemmer;

const stopwords = [
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
];


const searchBestiary = asyncHandler(async (req, res) => {
  try {
    const { text } = req.query;

    // const entry = await Bestiary.find();
    res.send(text);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getBestiaryEntries = asyncHandler(async (req, res) => {
  try {
    const entry = await Bestiary.find();
    res.send(entry);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createBestiaryEntry = asyncHandler(async (req, res) => {
  try {
    var words = [];
    const entry = await Bestiary.create(req.body);
    entry.entries.forEach((str) => {
      const tokens = stemmer.tokenizeAndStem(str);
      words = words.concat(tokens);
    });
    let cont = 0;
    for (const word of words) {
      const check = await checkIfWordExists(word);
      if (!check) {
        await createForNewWord(word);
      }
      await updateExistingWord(word, entry._id, cont);
      cont++;
    }
    const updated = await Bestiary.findOneAndUpdate({"_id": entry._id}, {"words": cont});
    res.status(200).json(entry);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getBestiaryEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Bestiary.findById(id);
    res.send(entry);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateBestiaryEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
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

const deleteBestiaryEntry = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
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
  getBestiaryEntry,
  updateBestiaryEntry,
  deleteBestiaryEntry,
  searchBestiary
};
