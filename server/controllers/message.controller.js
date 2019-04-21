const bcrypt = require('bcrypt');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Message = require('../models/message.model');

const messageSchema = Joi.object({
  text: Joi.string().required(),
  author: Joi.objectId().required()
})


module.exports = {
  insert,
  getAll
}

async function insert(message) {
  message = await Joi.validate(message, messageSchema, { abortEarly: false });
  message = await new Message(message).save();

  return Message.findById(message._id).populate("author").exec();
}

async function getAll(){
  return await Message.find().populate("author").exec();
}
