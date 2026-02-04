// controllers/sendMailController.js
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

class SendMailController {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail(email, otp, organization, subject) {
    await this.transporter.sendMail({
      from: `"${organization}" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: `<h2>${organization}</h2><p>Your OTP is <b>${otp}</b></p>`,
    });
    logger.info(`OTP sent to ${email}`);
  }
}

module.exports = SendMailController;
