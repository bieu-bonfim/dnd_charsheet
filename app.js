require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Character = require('./models/Character');
const Subrace = require('./models/Subrace');
const Race = require('./models/Race');
const Spell = require('./models/Spells');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = 5000 || process.env.PORT;


app.get('', (req, res) => {
  res.send("teste");
});

// ----------------------------- character ----------------------------------------
app.get('/character', async(req, res) => {
  try {
    const character = await Character.find()
    res.send(character)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/character', async(req, res) => {
  try {
    const character = await Character.create(req.body);
    res.status(200).json(character);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

app.get('/character/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findById(id);
    res.send(character);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.put('/character/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findByIdAndUpdate(id, req.body);
    if (!character) {
      return res.send(404)
      .json({message: `Personagem com id: ${id} não encontrado`});
    }
    const updatedCharacter = await Character.findById(id);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/character/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const character = await Character.findByIdAndDelete(id);
    if (!character) {
      return res.send(404)
      .json({message: `Personagem com id: ${id} não encontrado`});
    }
    res.status(200).json(character);
  } catch (error) {
    res.status(500).send(error.message);
  }
})



// --------------------------- race -------------------------------------
app.get('/race', async(req, res) => {
  try {
    const race = await Race.find()
    res.send(race)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/race', async(req, res) => {
  try {
    const race = await Race.create(req.body);
    res.status(200).json(race);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

app.get('/race/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const race = await Race.findById(id);
    res.send(race);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.put('/race/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const race = await Race.findByIdAndUpdate(id, req.body);
    if (!race) {
      return res.send(404)
      .json({message: `Raça com id: ${id} não encontrado`});
    }
    const updatedRace = await Race.findById(id);
    res.status(200).json(updatedRace)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/race/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const race = await Race.findByIdAndDelete(id);
    if (!race) {
      return res.send(404)
      .json({message: `Raça com id: ${id} não encontrado`});
    }
    res.status(200).json(race);
  } catch (error) {
    res.status(500).send(error.message);
  }
})


// --------------------------- subrace -------------------------------------

app.get('/subrace', async(req, res) => {
  try {
    const subrace = await Subrace.find()
    res.send(subrace)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/subrace', async(req, res) => {
  try {
    const subrace = await Subrace.create(req.body);
    res.status(200).json(subrace);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

app.get('/subrace/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const subrace = await Subrace.findById(id);
    res.send(subrace);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.put('/subrace/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const subrace = await Subrace.findByIdAndUpdate(id, req.body);
    if (!subrace) {
      return res.send(404)
      .json({message: `Sub raça com id: ${id} não encontrado`});
    }
    const updatedRace = await Race.findById(id);
    res.status(200).json(updatedRace)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/subrace/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const subrace = await Subrace.findByIdAndDelete(id);
    if (!subrace) {
      return res.send(404)
      .json({message: `Sub raça com id: ${id} não encontrado`});
    }
    res.status(200).json(subrace);
  } catch (error) {
    res.status(500).send(error.message);
  }
})


// ------------------------------ feitiços -----------------------------------------
app.get('/spell', async(req, res) => {
  try {
    const spell  = await Spell.find()
    res.send(spell)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/spell', async(req, res) => {
  try {
    const spell = await Spell.create(req.body);
    res.status(200).json(spell);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

app.get('/spell/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const spell = await Spell.findById(id);
    res.send(spell);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.put('/spell/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const spell = await Spell.findByIdAndUpdate(id, req.body);
    if (!spell) {
      return res.send(404)
      .json({message: `Feitiço com id: ${id} não encontrado`});
    }
    const updatedSpell = await Spell.findById(id);
    res.status(200).json(updatedSpell)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.delete('/spell/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const spell = await Spell.findByIdAndDelete(id);
    if (!spell) {
      return res.send(404)
      .json({message: `Feitiço com id: ${id} não encontrado`});
    }
    res.status(200).json(spell);
  } catch (error) {
    res.status(500).send(error.message);
  }
})
// ----------------------------------------------------------------

mongoose
.connect("mongodb://127.0.0.1:27017/charsheet")
.then(() => {
  console.log("Conectado ao banco de dados!");
  app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.log("Erro: "+error);
});


