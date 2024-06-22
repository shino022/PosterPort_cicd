const mongoose = require("mongoose"); //always import in files concerning db

//create schema
const posterSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Poster = mongoose.model("Poster", posterSchema);

module.exports = Poster;
