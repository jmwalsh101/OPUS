const express = require("express");
const app = express();
app.use(express.json());
const _ = require("lodash");
const mongoose = require("mongoose");
require("dotenv/config");

const Component = require("./models/Component");
const Document = require("./models/Document");

mongoose.connect(process.env.DB_CONNECTION, { useNewURLParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

const accounts = [];

let documents = [];
let documentId = 0;

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// REGISTER & LOGIN

app.post("/account-register", (req, res) => {
  const { parcel } = req.body;

  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  accounts.push(...parcel);
});

app.get("/account-login", (req, res) => {
  res.json(accounts);
});

// COMPONENTS

app.get("/component-load", async (req, res) => {
  try {
    //res.json(components);
    const databaseData = await Component.find();
    res.json(databaseData);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/component-delete", async (req, res) => {
  try {
    const deleteComponent = await Component.remove({
      id: req.body.componentId,
    });
    res.json(deleteComponent);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/component-new", (req, res) => {
  const { parcel } = req.body;

  const post = new Component({
    id: parcel[0].id,
    name: parcel[0].name,
    content: parcel[0].content,
    category: parcel[0].category,
    author: parcel[0].author,
    created: parcel[0].created,
    updater: parcel[0].updater,
    lastUpdated: parcel[0].lastUpdated,
  });
  post
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

app.post("/component-update", async (req, res) => {
  const { parcel } = req.body;
  const spread = Object.values({ ...parcel });
  try {
    const updateComponent = await Component.updateOne(
      { id: spread[0].id },
      {
        $set: {
          content: spread[0].content,
          updater: spread[0].updater,
          lastUpdated: spread[0].lastUpdated,
        },
      }
    );
    res.json(updateComponent);
  } catch (err) {
    res.json({ message: err });
  }
});

// DOCUMENTS

app.post("/document-new", (req, res) => {
  const { parcel } = req.body;

  const document = new Document({
    title: parcel.title,
    content: parcel.content,
    category: parcel.category,
    author: parcel.author,
    created: parcel.created,
    updater: parcel.updater,
    lastUpdated: parcel.lastUpdated,
  });

  document
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

app.get("/documents-load", async (req, res) => {
  try {
    //res.json(components);
    const databaseData = await Document.find();
    res.json(databaseData);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/document-delete", (req, res) => {
  const { parcel } = req.body;

  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  const documentIndex = _.findIndex(documents, {
    title: parcel,
  });
  documents.splice(documentIndex, 1);
});

app.post("/document-update", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  const documentIndex = _.findIndex(documents, function (document) {
    return document.title == String(parcel.title);
  });
  documents.splice(documentIndex, 1, parcel);
});
