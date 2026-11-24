const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const sign = (u) => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const safe = (u) => ({ id: u._id, name: u.name, email: u.email, phone: u.phone });

exports.signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || password.length < 6)
    return res.status(400).json({ msg: 'Fill all fields (password min 6 chars)' });
  if (await User.findOne({ email })) return res.status(400).json({ msg: 'Email already registered' });
  const user = await User.create({ name, email, phone, password: await bcrypt.hash(password, 10) });
  res.json({ token: sign(user), user: safe(user) });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password || '', user.password)))
    return res.status(400).json({ msg: 'Invalid email or password' });
  res.json({ token: sign(user), user: safe(user) });
};

exports.me = async (req, res) => res.json(safe(await User.findById(req.uid)));

exports.updateMe = async (req, res) => {
  const { name, phone } = req.body;
  res.json(safe(await User.findByIdAndUpdate(req.uid, { name, phone }, { new: true })));
};
