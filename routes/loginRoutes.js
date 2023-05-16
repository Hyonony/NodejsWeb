const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/login', (req, res) => {
  res.render('./views/pages/login.ejs');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.render('login', { error: 'Invalid email or password' });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.render('login', { error: 'Invalid email or password' });
  }

  req.session.user = user;
  res.redirect('/');
});

module.exports = router;