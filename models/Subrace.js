const { default: mongoose } = require("mongoose");

const subRaceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        ability: {
            type: String,
            required: true,
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