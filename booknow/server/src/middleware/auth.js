const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').split(' ')[1];
    req.uid = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch {
    res.status(401).json({ msg: 'Please log in' });
  }
};
