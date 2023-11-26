const { default: mongoose } = require("mongoose");

const bestiarySchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    source: {
      type: String
    },
    entries: {
      type: [String]
    },
    words: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Bestiary = mongoose.model('Bestiary', bestiarySchema);

module.exports = Bestiary;