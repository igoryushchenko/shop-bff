const express = require('express');
require('dotenv').config();
const { bffHandler } = require('./bff-controller');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.all('/*', bffHandler);

app.listen(PORT, () => {
  console.log('Application started');
});