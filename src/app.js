const express = require('express');
const bodyParser = require('body-parser');
const boletoRoutes = require('./routes/boletoRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(boletoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});