const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject: String,
  body: String,
  recipient: String,
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
