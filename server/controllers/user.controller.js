const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  name: Joi.string().required()
})


module.exports = {
  insert,
  remove,
  getById,
  getAll
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  return await new User(user).save();
}

async function remove(user) {
  return await User(user).deleteOne({_id: user._id})
}

async function getById(id){
  return await User.findById(id);
}

async function getAll(){
  return await User.find();
}
