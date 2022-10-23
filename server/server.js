const express = require("express");
const app = express();
app.use(express.json());
const data = [];

app.get("/api", (req, res) => res.json(data));

app.post("/api2", (req, res) => {
  const { parcel } = req.body;
  if (!parcel) {
    return res.status(400).sendStatus({ status: "failed" });
  }
  res.status(200).send({ status: "received" });
  // replace existing array with new array
  data = data.splice(0, data.length, ...parcel);
  console.log(data);
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
