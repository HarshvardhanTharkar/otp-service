// models/otpModel.js
const mongoose = require('mongoose');

const expiryMinutes = Number(process.env.OTP_VALIDITY_PERIOD_MINUTES || 5);

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, index: true },
    otp: { type: String },
    attempts: { type: Number },
  },
  { timestamps: true }
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: expiryMinutes * 60 });

module.exports = mongoose.model('Otp', otpSchema);
