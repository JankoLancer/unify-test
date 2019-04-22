const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  name: Joi.string().required(),
  active: Joi.bool().required()
})


module.exports = {
  insert,
  deactivate,
  getById,
  getAll
}

async function insert(user) {
  user.active = true;
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  return await new User(user).save();
}

async function deactivate(user) {
  return await User.findOneAndUpdate({ _id: user._id }, { active: false });
}

async function getById(id) {
  return await User.findOneAndUpdate({ _id: id }, { active: true });
}

async function getAll() {
  return await User.find({ active: true });
}
