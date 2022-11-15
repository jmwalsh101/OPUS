const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  title: String,
  content: Array,
  category: String,
  author: String,
  created: String,
  updater: String,
  lastUpdated: String,
});

module.exports = mongoose.model("Document", DocumentSchema);
