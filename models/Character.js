const { default: mongoose } = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Insira um nome para o personagem"]
    },
    str: {
      type: Number,
      required: true
    },
    dex: {
      type: Number,
      required: true
    },
    con: {
      type: Number,
      required: true
    },
    int: {
      type: Number,
      required: true
    },
    wis: {
      type: Number,
      required: true
    },
    cha: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  }
)

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;