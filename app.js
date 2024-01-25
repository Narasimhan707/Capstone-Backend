// app.js

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

mongoose.connect(
  'mongodb+srv://narasimhanraja707:Guvi-@emaildb.d8aueea.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const emailSchema = new mongoose.Schema({
  subject: String,
  body: String,
  recipient: String,
});

const Email = mongoose.model('Email', emailSchema);

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e6bbdaf09139a5',
    pass: '085fb524b9d75d',
  },
});

app.use(cors());

app.use(bodyParser.json());

app.get('/api/emails', async (req, res) => {
  try {
    const emails = await Email.find();
    console.log('GET API');
    res.json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/emails', async (req, res) => {
  const { subject, body, recipient } = req.body;

  const newEmail = new Email({ subject, body, recipient });
  try {
    await newEmail.save();

    const mailOptions = {
      from: 'narasimhan@gmail.com',
      to: recipient,
      subject,
      text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('transporter error', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error('catch', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
