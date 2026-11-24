const Movie = require('../models/Movie');
const Booking = require('../models/Booking');

exports.create = async (req, res) => {
  const { movie, show, seats } = req.body;
  const found = await Movie.findById(movie);
  if (!found || !seats?.length) return res.status(400).json({ msg: 'Invalid booking' });
  const existing = await Booking.find({ movie, show, status: 'booked' });
  const taken = existing.flatMap((b) => b.seats);
  if (seats.some((s) => taken.includes(s)))
    return res.status(409).json({ msg: 'Some seats were just taken. Pick others.' });
  res.json(await Booking.create({ user: req.uid, movie, show, seats, total: seats.length * found.price }));
};

exports.mine = async (req, res) =>
  res.json(await Booking.find({ user: req.uid }).populate('movie').sort('-createdAt'));

exports.cancel = async (req, res) => {
  await Booking.findOneAndUpdate({ _id: req.params.id, user: req.uid }, { status: 'cancelled' });
  res.json({ ok: true });
};
