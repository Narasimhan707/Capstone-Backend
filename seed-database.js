// seed-database.js

const mongoose = require('mongoose');
const Email = require('./email');

const mongoDBUrl =
  'mongodb+srv://narasimhanraja707:Guvi-@emaildb.d8aueea.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyEmails = [
  {
    subject: 'Hello',
    body: 'This is a test email.',
    recipient: 'test@example.com',
  },
  {
    subject: 'Meeting Tomorrow',
    body: "Don't forget about the meeting at 10 AM.",
    recipient: 'john.doe@example.com',
  },
  {
    subject: 'Important Announcement',
    body: 'Please read the attached document for important information.',
    recipient: 'admin@example.com',
  },
];

async function seedDatabase() {
  try {
    await Email.deleteMany();
    await Email.insertMany(dummyEmails);
    console.log('Dummy email data inserted successfully.');
  } catch (error) {
    console.error('Error inserting dummy email data:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
