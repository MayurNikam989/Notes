const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/?readPreference=primary";
const connectToMongo = () => {
  //connecting database
  mongoose.connect(mongoURI);
};

module.exports = connectToMongo;
