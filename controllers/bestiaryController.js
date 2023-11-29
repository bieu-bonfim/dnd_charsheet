const asyncHandler = require("express-async-handler");
const Bestiary = require("../models/Bestiary");
const InvertedIndex = require("../models/InvertedIndex");
const {
  createForNewWord,
  updateExistingWord,
  checkIfWordExists,
  getInvertedIndexOfWord,
  getDocsWithWord,
  getWordsFromDoc,
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

function removeAttribute(objects, attributeToRemove) {
  return objects.map((obj) => {
    const { [attributeToRemove]: removedAttribute, ...rest } = obj;
    return rest;
  });
}

function countSequences(array) {
  let count = 0;
  let currentSequenceLength = 1;

  for (let i = 1; i < array.length; i++) {
    if (array[i] === array[i - 1] + 1) {
      currentSequenceLength++;
    } else {
      if (currentSequenceLength > 1) {
        count++;
      }
      currentSequenceLength = 1;
    }
  }

  if (currentSequenceLength > 1) {
    count++;
  }

  return count;
}

const searchBestiary = asyncHandler(async (req, res) => {
  try {
    const { text } = req.query;
    let relevance = [];

    const tokens = stemmer.tokenizeAndStem(text);
    for (const token of tokens) {
      relevance = relevance.concat(await getDocsWithWord(token));
    }

    const flattenedResults = relevance.flatMap((item) => item.result);
    const relevances = flattenedResults.reduce((acc, current) => {
      const existingEntry = acc.find((entry) => entry.doc === current.doc);

      if (existingEntry) {
        existingEntry.tfidf = (existingEntry.tfidf + current.tfidf) / 2;
        existingEntry.positions = existingEntry.positions.concat(
          current.positions
        );
        existingEntry.positions.sort((a, b) => a - b);
        existingEntry.inTitle += current.inTitle;
      } else {
        acc.push({ ...current });
      }

      return acc;
    }, []);

    relevances.forEach((e) => {
      e.sequences = countSequences(e.positions);
    });

    const highestTfidf = Math.max(...relevances.map((doc) => doc.tfidf));
    const normalizedDocuments = relevances.map((doc) => ({
      ...doc,
      normalizedTfidf: doc.tfidf / highestTfidf,
      relevanceScore:
        (doc.tfidf / highestTfidf) * 0.3 +
        doc.sequences * 0.4 +
        doc.inTitle * 0.3,
    }));

    const sortedDocuments = normalizedDocuments.sort(
      (a, b) => b.relevanceScore - a.relevanceScore
    );

    const result = removeAttribute(sortedDocuments, "positions");

    res.send({
      result,
    });
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

const getSuggestions = asyncHandler(async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const suggestions = await Bestiary.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    })
      .select("name")
      .limit(5);

    res.json(suggestions);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createBestiaryEntry = asyncHandler(async (req, res) => {
  try {
    var words = [];
    var normal_name = [];
    entry = await Bestiary.create(req.body);
    normal_name = stemmer.tokenizeAndStem(entry.name);
    entry.entries.forEach((str) => {
      var tokens = stemmer.tokenizeAndStem(str);
      tokens = tokens.filter(
        (word) =>
          !stopwords.map((w) => w.toLowerCase()).includes(word.toLowerCase())
      );
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
    const updated = await Bestiary.findOneAndUpdate(
      { _id: entry._id },
      { words: cont, normal_name }
    );

    res.status(200).json(updated);
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
  searchBestiary,
  getSuggestions,
};
