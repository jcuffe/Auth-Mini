const router = require('express').Router();
const passport = require('passport')
const User = require('../users/User');

router.post('/register', function(req, res) {
  console.log('posting', req.body);
  User.create(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
  console.log('params', req.body)
  res.send({user: req.user})
})

module.exports = router;
