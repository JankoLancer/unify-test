const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/login', login);
router.delete('/logout', logout);
router.get('/me', passport.authenticate('jwt', { session: false }), login);


async function login(req, res) {
  var io = req.app.get('socketio');
  let user;
  try {
    if (req.user) {
      user = await userCtrl.getById(req.user._id);
    }
    else {
      user = await userCtrl.insert(req.body);
    }
    user = user.toObject();
    let token = authCtrl.generateToken(user);
    io.emit("user-activated", user);
    res.json({ user, token });
  } 
  catch (error) {
    res.status(500).send({ error: "User already exist" });
  }
}

async function logout(req, res){
  var io = req.app.get('socketio');
  let user = userCtrl.deactivate(req.body);
  io.emit("user-deactivated", req.body);
  res.json({user});
}
