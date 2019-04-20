const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
