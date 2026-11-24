const { Schema, model } = require('mongoose');

module.exports = model('Booking', new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
  show: String,
  seats: [String],
  total: Number,
  status: { type: String, default: 'booked' },
}, { timestamps: true }));
