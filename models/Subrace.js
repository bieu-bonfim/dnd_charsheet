const { default: mongoose } = require("mongoose");

const subraceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ability: {
    str: {
      type: Number,
      required: false,
    },
    dex: {
      type: Number,
      required: false,
    },
    con: {
      type: Number,
      required: false,
    },
    int: {
      type: Number,
      required: false,
    },
    wis: {
      type: Number,
      required: false,
    },
    cha: {
      type: Number,
      required: false,
    },
  },
  darkvision: {
    type: Number,
    required: false,
  },
  entries: {
    type: [Array],
    required: false,
  },
  race: {
    type: String
  },
  // race_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Race",
  // },
});

const Subrace = mongoose.model("Subrace", subraceSchema);

module.exports = Subrace;
