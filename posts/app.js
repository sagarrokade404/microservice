const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();

// parse application/x-www-form-urlencoded
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(201).send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  await axios.post("http://localhost:3006/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(200).send(posts[id]);
});

app.post("/events", (req, res) => {
    console.log('event created post', req.body );
    res.send({})
});

app.listen(3001, () => {
  console.log('version 0.0.4')
  console.log("server started at 3001");
});
