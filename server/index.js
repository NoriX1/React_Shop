const express = require('express');
const morgan = require('morgan');
const db = require('./db');

const app = express();
app.use(morgan('combined'));

app.get('/pizzas', (req, res) => {
  res.send(db);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});