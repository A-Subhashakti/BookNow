const Movie = require('../models/Movie');
const Booking = require('../models/Booking');

exports.list = async (req, res) => {
  const filter = {};
  if (req.query.q) filter.title = new RegExp(req.query.q, 'i');
  if (req.query.genre && req.query.genre !== 'All') filter.genre = req.query.genre;
  res.json(await Movie.find(filter));
};

exports.get = async (req, res) => res.json(await Movie.findById(req.params.id));

exports.seats = async (req, res) => {
  const bookings = await Booking.find({ movie: req.params.id, show: req.query.show, status: 'booked' });
  res.json(bookings.flatMap((b) => b.seats));
};
