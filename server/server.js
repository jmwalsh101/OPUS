const express = require("express");
const app = express();
app.use(express.json());

const components = [];

let componentId = 0;

app.get("/api", (req, res) => res.json(components));

app.get("/component-id", (req, res) => {
  res.json(componentId);
});

app.post("/api2", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  components.push(...parcel);
  componentId = componentId + 1;
  console.log(components);
  console.log(componentId);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
