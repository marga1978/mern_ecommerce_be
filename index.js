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
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 10;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 10) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }

    const usersWithCount = await User.find()
      .skip(page * size)
      .limit(size);

    const numberUser = await User.find().countDocuments();
    res.send({
      content: usersWithCount,
      totalPages: Math.ceil(numberUser / Number.parseInt(size)),
    });
  } catch (err) {
    console.log(err);
    res.send("error get users");
  }
});

function InvalidObjectIdException() {
  this.status = 400;
  this.message = "Invalid Object ID";
}

function UserNotFoundException() {
  this.status = 404;
  this.message = "User not found";
}

app.get("/users/:id", async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new InvalidObjectIdException('Object id not found'));
  }
  const user = await User.findById(id);
  if (!user) {
    next(new UserNotFoundException('User not found'));
  }
  res.send(user);
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    user.username = req.body.username;
    await user.save();
    res.status(200).send({ message: "updated" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "error update single users" });
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



app.use((err, req, res, next) => {
  return res.status(err.status).send({
    message: err.message,
    timestamp: Date.now(),
    path: req.originalUrl,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(async (result) => {
    //app.listen(process.env.PORT || 3000);
    
    app.listen(3000);
    for (let i = 1; i <= 5; i++) {
      const user = new User({
        username: `user${i}`,
        email: `user${i}@mail.com`,
        password: "P4ssword",
      });
      try {
        await user.save();
      } catch (err) {
        console.log("errore creazione utenti");
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
