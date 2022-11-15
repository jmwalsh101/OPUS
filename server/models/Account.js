import { Schema, model } from "mongoose";

const AccountSchema = Schema({
  username: String,
  password: String,
  email: String,
});

export default model("Account", AccountSchema);
