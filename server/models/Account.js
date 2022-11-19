const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("Account", AccountSchema);
