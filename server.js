'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const userAuthRoutes = require('./routes/api/userAuthRoutes');
const expensesRoutes = require('./routes/api/expensesRoutes');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//For jelastic ssl use
app.enable('trust proxy');

// Connect to Mongo database
mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT}/test`,
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
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

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', userAuthRoutes);
app.use('/api/expenses', expensesRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//For local dev disable https conenction
//Only enable when delpolying to git and jelastic
app.use((req, res, next) => {
  if (req.secure) {
    // request was via https, so do no special handling
    next();
  } else {
    // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host + req.url);
  }
});
