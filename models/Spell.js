const { default: mongoose} = require("mongoose");

const spellSchema = mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
          unique: true
        },
        level: {
          type: Number,
          required: true
        },
        school: {
          type: String,
          required: true
        },
        time: {
          type: [
            Array
          ],
          required: true
        },
        range: {
          type: {
            type: String,
            required: true
          },
          distance: {
            type: {
              type: String,
              required: false
            },
            amount: {
              type: Number,
              required: false
            }
          }
        },
        components: {
          v: {
            type: Boolean,
            required: false
          },
          s: {
            type: Boolean,
            required: false
          },
          m: {
            type: [
              Array
            ],
            required: false
          }
        },
        duration: {
          type: [
            Array
          ],
          required: true
        },
        classes: {
          fromClassList: {
            type: [
              Array
            ]
          }
        },
        source: {
          type: String
        },
        entries: {
          type: [
            Array
          ]
        },
        page: {
          type: Number
        },
        damageInflict: {
          type: [
            String
          ]
        },
        savingThrow: {
          type: [
            String
          ]
        }
      }
)

const Spell = mongoose.model('Spell', spellSchema);

module.exports = Spell;