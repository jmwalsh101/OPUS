const express = require("express");
const app = express();
app.use(express.json());
const _ = require("lodash");

const components = [];

let componentId = 0;

app.get("/component-load", (req, res) => res.json(components));

app.get("/component-id", (req, res) => {
  res.json(componentId);
});

app.post("/component-delete", (req, res) => {
  console.log(components);
  const { parcel } = req.body;

  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
    res.json(false);
  }
  res.status(200).send({ status: "received" });
  const spread = Object.values({ ...parcel });
  const receivedID = spread.join("");
  const componentIndex = _.findIndex(components, function (component) {
    return component.id == receivedID;
  });
  components.splice(componentIndex, 1);
  console.log(components);
  res.json(true);
});

app.post("/component-update", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  components.push(...parcel);
  componentId = componentId + 1;
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
