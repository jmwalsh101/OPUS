const mongoose = require("mongoose");

const TextIdSchema = mongoose.Schema({
  name: String,
  idCount: Number,
});

module.exports = mongoose.model("TextId", TextIdSchema);
