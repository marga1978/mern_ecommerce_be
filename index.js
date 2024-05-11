require("dotenv").config();
//const express = require("express");
const mongoose = require("mongoose");
const User = require("./src/user/model/User");
const Article = require("./src/article/Article");
const app = require('./src/app');

const MONGODB_URI = `mongodb+srv://${process.env.MONDOGB_USERNAME}:${process.env.MONDOGB_PASSWORD}@cluster0.otwx1ks.mongodb.net/${process.env.MONDOGB_DATABASE}`;

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
