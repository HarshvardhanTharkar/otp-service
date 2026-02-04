// models/blockListModel.js
const mongoose = require('mongoose');

const blocklistSchema = new mongoose.Schema(
  {
    ip: String,
    email: String,
  },
  { timestamps: true }
);

blocklistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('Blocklist', blocklistSchema);
