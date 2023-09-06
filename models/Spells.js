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
            Mixed
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
            Mixed
          ]
        },
        classes: {
          fromClassList: {
            type: [
              Mixed
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