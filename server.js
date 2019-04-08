require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to database
mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT}/test`,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(
    () => {
      console.log('Connected to db successfully.');
      app.listen(process.env.APP_PORT, () =>
        console.log(`Listening on port...${process.env.APP_PORT}`)
      );
    },
    err => {
      console.log('Connection to db failed: ' + err);
    }
  );

app.get('/api', (req, res) => {
  res.send('Hello from the server side');
});
