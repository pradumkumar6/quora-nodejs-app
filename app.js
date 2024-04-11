const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const methodOverride = require("method-override");
const PORT =  8080;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// set engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "pradyum",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "shreya",
    content: "Hard work is imporatant to achieve the success",
  },
  {
    id: uuidv4(),
    username: "laxman",
    content: "I got selected for my 1st Internship",
  },
  {
    id: uuidv4(),
    username: "Buddha",
    content:
      "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
  },
];

//routes
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
