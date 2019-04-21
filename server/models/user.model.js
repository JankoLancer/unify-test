const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index:true 
  },
  active: {
    type: Boolean,
    required: true
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
