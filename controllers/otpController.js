// controllers/otpController.js
const Otp = require('../models/otpModel');
const generateOTP = require('../utils/generateOTP');
const logger = require('../utils/logger');
const crypto = require('crypto');

const OTP_SIZE = Number(process.env.OTP_SIZE || 6);
const VALIDITY_MINUTES = Number(process.env.OTP_VALIDITY_PERIOD_MINUTES || 5);
const MAX_ATTEMPTS = Number(process.env.MAX_OTP_ATTEMPTS || 3);

class OtpController {
  async generateOtp(email, type) {
    const now = new Date();
    const validAfter = new Date(now.getTime() - VALIDITY_MINUTES * 60 * 1000);

    const existing = await Otp.findOne({ email, createdAt: { $gte: validAfter } });

    if (existing) {
      if (existing.attempts >= MAX_ATTEMPTS) {
        throw new Error('OTP request limit exceeded');
      }
      existing.attempts += 1;
      await existing.save();
      return existing.rawOtp;
    }

    const rawOtp = generateOTP(OTP_SIZE, type);
    const hashedOtp = crypto.createHash('sha256').update(rawOtp).digest('hex');

    await Otp.create({
      email,
      otp: hashedOtp,
      attempts: 1,
    });

    return rawOtp;
  }

  async verifyOtp(email, otp) {
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const record = await Otp.findOneAndDelete({
      email,
      otp: hashedOtp,
    });

    if (!record) {
      throw new Error('Invalid or expired OTP');
    }

    return true;
  }
}

module.exports = OtpController;
