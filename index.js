require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");

const MONGODB_URI = `mongodb+srv://${process.env.MONDOGB_USERNAME}:${process.env.MONDOGB_PASSWORD}@cluster0.otwx1ks.mongodb.net/${process.env.MONDOGB_DATABASE}`;

const app = express();

app.use(express.json()); //altrimenti le chiamate rest non funzionano

app.post("/users", async (req, res) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  try {
    await user.save();
    res.send("success");
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

app.get("/users", async (req, res) => {
  try {
    //const users = await User.findAll();
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send("error get users");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //const user = await User.findOne({ where: { id: id } });
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.send("error get single users", err);
  }
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    user.username = req.body.username;
    await user.save();
    res.send("updated");
  } catch (err) {
    console.log(err);
    res.send("error update single users");
  }
  //const user = await User.findOne({where: {id: id}});
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {

    await User.deleteOne({ _id: id });
    //await User.destroy({ where: { id: id } });
    res.send("removed");
  } catch (err) {
    res.send("error removed");
  }
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    //app.listen(process.env.PORT || 3000);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
