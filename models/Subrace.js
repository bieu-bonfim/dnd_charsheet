const { default: mongoose } = require("mongoose");

const subRaceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
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
            type: Number,
            required: false
        },
        entries: {
            type: [
                Array
            ],
            required: false
        }
})

const Subrace = mongoose.model('Subrace', subRaceSchema);

module.exports = Subrace;