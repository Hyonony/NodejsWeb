const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.get('/', (req, res) => {
  res.render('../views/pages/signup');
});

router.post('/', async (req, res) => {
  const { userID, email, password } = req.body;

  const user = await userModel.createUser(userID, email, password);

  req.session.user = user;
  res.redirect('/');
});

module.exports = router;