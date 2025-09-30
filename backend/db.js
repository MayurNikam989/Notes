const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const connectToMongo = () => {
  //connecting database
  mongoose.connect(mongoURI);
  mongoose.set('autoIndex', false);
};

module.exports = connectToMongo;
