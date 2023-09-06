require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Character = require('./models/Character');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = 5000 || process.env.PORT;


app.get('', (req, res) => {
  res.send("teste");
});

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


