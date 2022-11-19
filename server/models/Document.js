const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  title: String,
  content: Array,
  category: String,
  author: String,
  created: String,
  updater: String,
  updated: String,
});

module.exports = mongoose.model("Document", DocumentSchema);
