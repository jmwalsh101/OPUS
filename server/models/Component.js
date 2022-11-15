import { Schema, model } from "mongoose";

const ComponentSchema = Schema({
  id: String,
  name: String,
  content: String,
  category: String,
  author: String,
  created: String,
  updater: String,
  lastUpdated: String,
});

export default model("Component", ComponentSchema);
