const express = require("express");
const app = express();
app.use(express.json());

const components = [];

app.get("/api", (req, res) => res.json(components));

app.post("/api2", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  components.push(...parcel);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
