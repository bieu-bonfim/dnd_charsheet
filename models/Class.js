const { default: mongoose } = require("mongoose");

const classSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    source: {
      type: String
    },
    hd: {
      number: {
        type: Number
      },
      faces: {
        type: Number
      }
    },
    proficiency: {
      type: [
        String
      ]
    },
    startingProficiencies: {
      armor: {
        type: [
          String
        ]
      },
      weapons: {
        type: [
          String
        ]
      },
      skills: {
        choose: {
          type: Number
        },
        from: {
          type: [
            String
          ]
        }
      }
    },
    startingEquipment: {
      additionalFromBackground: {
        type: Boolean
      },
      default: {
        type: [
          String
        ]
      },
      goldAlternative: {
        type: String
      }
    },
    classFeatures: {
      type: [
        Array
      ]
    },
    subclassTitle: {
      type: String
    },
    subclasses: [
      {type: mongoose.Schema.Types.ObjectId,ref:'Subclass'}
    ]
  },
  {
    timestamps: true
  }
);

const Class = mongoose.model('Class', classSchema);

module.exports = Class;