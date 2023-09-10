require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const characterRoute = require('./routes/characterRoute');
const raceRoute = require('./routes/raceRoute');
const subraceRoute = require('./routes/subraceRoute');
const spellRoute = require('./routes/spellRoute');
const classRoute = require('./routes/classRoute');
const subclassRoute = require('./routes/subclassRoute');
const backgroundRoute = require('./routes/backgroundRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');


const app = express();

app.use(cors());
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
app.use('/api/background', backgroundRoute);

app.get('', (req, res) => {
  res.send("teste");
});

app.use(errorMiddleware);

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


