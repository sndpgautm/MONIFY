'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userAuthRoutes = require('./routes/api/userAuthRoutes');
const expensesRoutes = require('./routes/api/expensesRoutes');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to Mongo database
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

// Use Routes
app.use('/api/users', userAuthRoutes);
app.use('/api/expenses', expensesRoutes);
