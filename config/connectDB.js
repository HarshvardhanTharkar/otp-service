// config/connectDb.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

let connection = null;

const connectDB = async () => {
  if (connection) return connection;
  try {
    connection = await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
    });
    logger.info('MongoDB connected');
    return connection;
  } catch (err) {
    logger.error('MongoDB connection failed', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
