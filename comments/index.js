const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(201).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
 
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: 'pending' });

  await axios.post("http://localhost:3006/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    },
  });
  commentsByPostId[req.params.id] = comments;

  res.status(200).send(comments);
});


app.post("/events", async (req, res) => {
    // console.log('event created comment', req.body );
    const {type, data } = req.body;

    if(type === 'CommentModarated') {
      const {postId, id, status, content } = data;

      const comments = commentsByPostId[postId];

      const comment = comments.find(comment => {return comment.id === id});

      comment.status = status;
    
     await axios.post('http://localhost:3006/events', {
        type: 'CommentUpdated',
        data: {
          id,
          postId,
          content, 
          status
        }
      })
    };
    res.send({})
});

app.listen(3002, () => {
  console.log("server started at 3002");
});
