const express = require("express");
const app = express();
app.use(express.json());
const _ = require("lodash");

const components = [];
let componentId = 0;

const documents = [];
let documentId = 0;

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// COMPONENTS

app.get("/component-load", (req, res) => res.json(components));

app.get("/component-id", (req, res) => {
  res.json(componentId);
});

app.post("/component-delete", (req, res) => {
  console.log(components);
  const { parcel } = req.body;

  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  const spread = Object.values({ ...parcel });
  const receivedID = spread.join("");
  const componentIndex = _.findIndex(components, function (component) {
    return component.id == receivedID;
  });
  components.splice(componentIndex, 1);
  console.log(components);
});

app.post("/component-new", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  components.push(...parcel);
  componentId = componentId + 1;
});

app.post("/component-update", (req, res) => {
  console.log(components);
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  const spread = Object.values({ ...parcel });
  console.log(spread[0].id);
  const componentIndex = _.findIndex(components, function (component) {
    return component.id == spread[0].id;
  });
  console.log(componentIndex);
  components.splice(componentIndex, 1, spread[0]);
  console.log(components);
});

// DOCUMENTS

app.post("/document-new", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  documents.push(parcel);
  documentId = documentId + 1;
});

app.get("/documents-load", (req, res) => {
  res.json(documents);
  console.log(documents);
});
