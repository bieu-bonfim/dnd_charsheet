const { default: mongoose } = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Insira um nome para o personagem"]
    },
    pericias: {
      type: [
        String
      ]
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
    class :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Class'
    },
    subclass: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Subclass'
    },
    race: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Race'
    },
    subrace: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Subrace'
    },
    background: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Background'
    },
    spells: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Spell'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;