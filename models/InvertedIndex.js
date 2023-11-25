const { default: mongoose } = require("mongoose");

const invertedIndexSchema = mongoose.Schema(
  {
    word: {
      type: String,
    },
    entries: [
      {
        doc: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bestiary",
        },
        pos: {
          type: Number
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const InvertedIndex = mongoose.model("InvertedIndex", invertedIndexSchema);

module.exports = InvertedIndex;
