const mongoose = require("mongoose");

const ComponentSchema = mongoose.Schema({
  id: String,
  name: String,
  content: String,
  category: String,
  author: String,
  created: String,
  updater: String,
  lastUpdated: String,
});

module.exports = mongoose.model("Component", ComponentSchema);
