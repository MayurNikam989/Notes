const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const connectToMongo = () => {
  //connecting database
  mongoose.connect(mongoURI);
};

module.exports = connectToMongo;
