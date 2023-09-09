const { default: mongoose } = require("mongoose");

const raceSchema = mongoose.Schema(
    {
        name: {
          type: String
        },
        source: {
          type: String
        },
        page: {
          type: Number
        },
        size: {
          type: String
        },
        speed: {
          type: Number
        },
        ability: {
            str: {
                type: Number,
                required: false
              },
              dex: {
                type: Number,
                required: false
              },
              con: {
                type: Number,
                required: false
              },
              int: {
                type: Number,
                required: false
              },
              wis: {
                type: Number,
                required: false
              },
              cha: {
                type: Number,
                required: false
              }
        },
        darkvision: {
          type: Number
        },
        entries: {
          type: [
            Array
          ]
        }
      },
    {
        timestamps: true
    }
)

const Race = mongoose.model('Race', raceSchema);

module.exports = Race;