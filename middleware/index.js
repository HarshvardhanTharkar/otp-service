// middleware/index.js
const Blocklist = require('../models/blockListModel');
const { isValidEmail } = require('../utils/validator');

const cache = new Map();
const CACHE_TTL = 60 * 1000;

const validateSpamMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const ip = req.ip;
  const key = email || ip;
  const now = Date.now();

  if (cache.has(key) && now - cache.get(key) < CACHE_TTL) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  const blocked = await Blocklist.findOne({ $or: [{ email }, { ip }] });
  if (blocked) {
    cache.set(key, now);
    return res.status(403).json({ error: 'Blocked' });
  }

  next();
};

const validateEmail = (req, res, next) => {
  if (!isValidEmail(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  next();
};

module.exports = { validateSpamMiddleware, validateEmail };
