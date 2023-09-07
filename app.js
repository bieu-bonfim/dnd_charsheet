require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const characterRoute = require('./routes/characterRoute');
const raceRoute = require('./routes/raceRoute');
const subraceRoute = require('./routes/subraceRoute');
const spellRoute = require('./routes/spellRoute');
const classRoute = require('./routes/classRoute');
const subclassRoute = require('./routes/subclassRoute');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = 5000 || process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use('/api/character', characterRoute);
app.use('/api/race', raceRoute);
app.use('/api/subrace', subraceRoute);
app.use('/api/spell', spellRoute);
app.use('/api/class', classRoute);
app.use('/api/subclass', subclassRoute);

app.get('', (req, res) => {
  res.send("teste");
});


mongoose
.connect(MONGO_URL)
.then(() => {
  console.log("Conectado ao banco de dados!");
  app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.log("Erro: "+error);
});


