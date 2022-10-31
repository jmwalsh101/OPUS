const express = require("express");
const app = express();
app.use(express.json());
const _ = require("lodash");

const accounts = [];

const components = [];
let componentId = 0;

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

app.get("/component-load", (req, res) => {
  res.json(components);
});

app.get("/component-id", (req, res) => {
  res.json(componentId);
});

app.post("/component-delete", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  documents = documents.map((obj) => {
    return {
      ...obj,
      content: obj.content.filter((n) => Number(n) !== parcel),
    };
  });
  const componentIndex = _.findIndex(components, function (component) {
    return component.id == parcel;
  });
  components.splice(componentIndex, 1);
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
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  const spread = Object.values({ ...parcel });
  const componentIndex = _.findIndex(components, function (component) {
    return component.id == spread[0].id;
  });
  components.splice(componentIndex, 1, spread[0]);
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
