const mongoose = require("mongoose");

const DB_STRING =
  "mongodb+srv://devtinder_db:Password123@cluster0.ta39kfa.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(DB_STRING);
};

module.exports = { connectDB };
