import { Schema, model } from "mongoose";

const DocumentSchema = Schema({
  title: String,
  content: Array,
  category: String,
  author: String,
  created: String,
  updater: String,
  updated: String,
});

export default model("Document", DocumentSchema);
