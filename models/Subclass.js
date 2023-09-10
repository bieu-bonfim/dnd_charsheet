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
    class_id :{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Class'
    },
    class: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Subclass = mongoose.model('Subclass', subclassSchema);

module.exports = Subclass;
