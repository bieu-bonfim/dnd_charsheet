const { default: mongoose } = require("mongoose");

const raceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        speed: {
            type: Number,
            required: true
        },
        darkvision: {
            type: Number,
            required: false
        },
        ability: {
            type: String,
            required: true
        },
        entries: {
            type: [
                Array
            ],
            required: false
        },
    },
    {
        timestamps: true
    }
)

const Race = mongoose.model('Race', raceSchema);

module.exports = Race;