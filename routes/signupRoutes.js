const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/', (req, res) => {
  res.render('../views/pages/signup');
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  req.session.user = user;
  res.redirect('/');
});

module.exports = router;