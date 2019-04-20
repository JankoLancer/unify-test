const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/login', login);
router.get('/me', passport.authenticate('jwt', { session: false }), login);


async function login(req, res) {
  let user;
  if (req.user) {
    user = await userCtrl.getById(req.user._id);
    console.log(user);
  }
  else {
    user = await userCtrl.insert(req.body);
    console.log(user);
  }
  user = user.toObject();
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}
