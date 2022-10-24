const express = require("express");
const app = express();
app.use(express.json());
const _ = require("lodash");

const components = [];

let componentId = 0;

app.get("/api", (req, res) => res.json(components));

app.get("/component-id", (req, res) => {
  res.json(componentId);
});

app.post("/component-delete", (req, res) => {
  const { parcel } = req.body;
  const receivedID = Object.values({ ...parcel });
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  const componentIndex = _.findIndex(components, function (o) {
    return o.id == receivedID;
  });
  components.splice(componentIndex, 1);
});

app.post("/api2", (req, res) => {
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
