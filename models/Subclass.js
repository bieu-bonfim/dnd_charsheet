const { default: mongoose } = require("mongoose");

const subclassSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    subclassFeatures: {
      type: [
        Array
      ]
    },
    source: {
      type: String
    },
    shortName: {
      type: String
    },
    class :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Class'
    }
  },
  {
    timestamps: true
  }
);

const Subclass = mongoose.model('Subclass', subclassSchema);

module.exports = Subclass;
