const { Schema, model } = require('mongoose');

module.exports = model('User', new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
}, { timestamps: true }));
