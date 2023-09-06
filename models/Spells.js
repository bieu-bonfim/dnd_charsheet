const { default: mongoose} = require("mongoose");

const spellSchema = mongoose.Schema(
    {
        name: {
          type: String
        },
        level: {
          type: Number
        },
        school: {
          type: String
        },
        time: {
          type: [
            Array
          ]
        },
        range: {
          type: {
            type: String
          },
          distance: {
            type: {
              type: String
            },
            amount: {
              type: Number
            }
          }
        },
        components: {
          v: {
            type: Boolean
          },
          s: {
            type: Boolean
          }
        },
        duration: {
          type: [
            Array
          ]
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
            String
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