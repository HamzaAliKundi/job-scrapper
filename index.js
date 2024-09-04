const express = require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./server/config/db');
const indeed = require('./scrapper/indeed/indeed');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

setTimeout(() => {
  console.log('running again');
  indeed();
}, 5000);

app.listen(port, () => console.log(`Server started at : ${port}`));
