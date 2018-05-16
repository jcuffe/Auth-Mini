const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../users/User')

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username })
    .then(user => user.validatePassword(password)
      .then(validated => validated
        ? done(null, user)
        : done(null, 'error')))
}))

module.exports = function(server) {
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(cors());
  server.use(passport.initialize())
};
