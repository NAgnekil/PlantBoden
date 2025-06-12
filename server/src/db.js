const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔍 Ansluten till databas:', mongoose.connection.name);
    console.log('🟢 MongoDB connected');
  } catch (error) {
    console.error('🔴 MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
