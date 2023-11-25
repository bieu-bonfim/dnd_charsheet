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
      Mixed
    }
  },
  {
    timestamps: true
  }
);

const Bestiary = mongoose.model('Bestiary', bestiarySchema);

module.exports = Bestiary;