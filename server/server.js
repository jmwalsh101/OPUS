const express = require("express");
const app = express();
app.use(express.json());
const _ = require("lodash");
const mongoose = require("mongoose");
require("dotenv/config");

const Component = require("./models/Component");
const Document = require("./models/Document");
const Account = require("./models/Account");
const TextId = require("./models/TextId");

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewURLParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

// REGISTER & LOGIN

app.post("/account-register", (req, res) => {
  const { parcel } = req.body;

  const account = new Account({
    username: parcel[0].username,
    password: parcel[0].password,
    email: parcel[0].email,
  });
  account
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});

app.get("/account-login", async (req, res) => {
  try {
    const databaseData = await Account.find();
    res.json(databaseData);
  } catch (err) {
    res.json({ message: err });
  }
});

app.patch("/account-update", async (req, res) => {
  const { parcel } = req.body;

  try {
    const updatedAccount = await Account.updateOne(
      {
        username: parcel[0].username,
      },
      { $set: { email: parcel[0].email, password: parcel[0].password } }
    );
    console.log("updated account", updatedAccount);
    res.json(updatedAccount);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/account-delete", async (req, res) => {
  const { parcel } = req.body;
  console.log("parcel", parcel);

  try {
    const deleteAccount = await Account.deleteOne({
      username: parcel,
    });
    console.log(deleteAccount);
    res.json(deleteAccount);
  } catch (err) {
    res.json({ message: err });
  }
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
    const deleteComponent = await Component.deleteOne({
      id: req.body.componentId,
    });

    const documentComponents = await Document.updateMany(
      {
        content: req.body.componentId,
      },
      { $pull: { content: req.body.componentId } }
    );
    console.log(documentComponents);
    res.json(deleteComponent);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/component-new", async (req, res) => {
  const { parcel } = req.body;
  try {
    const idCount = await TextId.find();
    console.log("id count", idCount[0].idCount);
    await TextId.updateOne(
      { name: "ID Count" },
      {
        $set: {
          idCount: idCount[0].idCount + 1,
        },
      }
    );
    const component = await new Component({
      id: parcel[0].id,
      name: parcel[0].name,
      content: parcel[0].content,
      category: parcel[0].category,
      author: parcel[0].author,
      created: parcel[0].created,
      updater: parcel[0].updater,
      lastUpdated: parcel[0].lastUpdated,
    });
    component
      .save()
      .then((data) => res.json(data))
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/component-update", async (req, res) => {
  const { parcel } = req.body;
  const spread = Object.values({ ...parcel });
  try {
    const updateComponent = await Component.updateOne(
      { id: spread[0].id },
      {
        $set: {
          category: spread[0].category,
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

app.get("/textId-load", async (req, res) => {
  try {
    const textIds = await TextId.find();
    res.json(textIds);
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
    updated: parcel.updated,
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
    const databaseData = await Document.find();
    res.json(databaseData);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/document-delete", async (req, res) => {
  const { parcel } = req.body;
  try {
    const deleteDocument = await Document.remove({
      title: parcel,
    });
    res.json(deleteDocument);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/document-update", async (req, res) => {
  const { parcel } = req.body;

  try {
    const updateDocument = await Document.updateOne(
      { title: parcel.title },
      {
        $set: {
          category: parcel.category,
          content: parcel.content,
          updater: parcel.updater,
          updated: parcel.updated,
        },
      }
    );
    res.json(updateDocument);
  } catch (err) {
    res.json({ message: err });
  }
});
