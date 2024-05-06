require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./user");
const Article = require("./article");

const MONGODB_URI = `mongodb+srv://${process.env.MONDOGB_USERNAME}:${process.env.MONDOGB_PASSWORD}@cluster0.otwx1ks.mongodb.net/${process.env.MONDOGB_DATABASE}`;

const app = express();

app.use(express.json()); //altrimenti le chiamate rest non funzionano


const thisWillRunInEveryRequest = (req, res, next) => {
  console.log('running the middleware for', req.method, req.originalUrl);
  next();
}

app.use(thisWillRunInEveryRequest);

const pagination = (req, res, next) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber;
  }

  let size = 10;
  if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
    size = sizeAsNumber;
  }
  req.pagination = {
    page, size
  }
  next();
}

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

app.get("/users", pagination, async (req, res) => {
  try {
    const { page, size } = req.pagination;
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

const objectIdNumberControl = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new InvalidObjectIdException();
    //next(new InvalidObjectIdException());
  }
  next();
}

app.get("/users/:id", objectIdNumberControl, async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    next(new UserNotFoundException('User not found'));
  }
  res.send(user);
});

app.put("/users/:id", objectIdNumberControl, async (req, res) => {
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
});



app.delete("/users/:id", objectIdNumberControl, async (req, res) => {
  const id = req.params.id;
  try {
    await User.deleteOne({ _id: id });
    //await User.destroy({ where: { id: id } });
    res.send("removed");
  } catch (err) {
    res.send("error removed");
  }
});

//ARTICLES
app.get("/articles", pagination, async (req, res) => {
  try {
    const { page, size } = req.pagination;
    const articlesWithCount = await User.find()
      .skip(page * size)
      .limit(size);

    const numberArticle = await User.find().countDocuments();
    res.send({
      content: articlesWithCount,
      totalPages: Math.ceil(numberArticle / Number.parseInt(size)),
    });
  } catch (err) {
    console.log(err);
    res.send("error get articles");
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
        const article = new Article({
          content: `article content ${i}`
        });
        await article.save();
      } catch (err) {
        console.log("errore ",err);
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
