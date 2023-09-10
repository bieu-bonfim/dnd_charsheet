const { default: mongoose } = require("mongoose");

const backgroundSchema = mongoose.Schema(
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
        skillProficiencies: {
          type: String
        },
        entries: {
          type: [
            Array
          ]
        }
      }
)

const Background = mongoose.model('Background', backgroundSchema);

module.exports = Background;