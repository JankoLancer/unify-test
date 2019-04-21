const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const messageCtrl = require('../controllers/message.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))
router.get('/', messages);
router.post('/', asyncHandler(insert));


async function insert(req, res) {
    let message = await messageCtrl.insert(req.body);
    var io = req.app.get('socketio');
    io.emit('new-message', message);
    res.json(message);
}

async function messages(req, res) {
    let messages = await messageCtrl.getAll({});
    res.json(messages);
}
