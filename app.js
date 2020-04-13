const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://192.168.101.167:27017/dsrAPI');
const port = process.env.PORT || 3000;
const Dsr = require('./models/dsrModel');
const dsrRouter = require('./routes/dsrRouter')(Dsr);
const dsrDownloadRouter = require('./routes/dsrDownloadRouter')(Dsr);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', dsrRouter);
app.use('/api/download',dsrDownloadRouter);

app.get('/', (req, res) => {
  res.send('Welcome to DSR App!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
