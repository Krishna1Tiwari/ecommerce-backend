const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
  const mongoUri = process.env.MONGO_URI;

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, // Add this line
    // useFindAndModify: true, // Add this line
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};