const { Schema, model } = require('mongoose');

module.exports = model('Movie', new Schema({
  title: String,
  genre: String,
  language: String,
  duration: Number,
  rating: Number,
  poster: String,
  description: String,
  price: Number,
  shows: [String],
}));
