const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  shelfNo: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  date: {
      type: Date,
      default: Date.now,
      required: false
  }
  
});

mongoose.model("Book", bookSchema);