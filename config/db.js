const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect('mongodb://127.0.0.1:27017/novinshop');
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
