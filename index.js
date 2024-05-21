require("dotenv").config();
//const express = require("express");
const mongoose = require("mongoose");
const User = require("./src/user/model/User");
const Article = require("./src/article/Article");
const app = require('./src/app');
const config = require("./config");

//const config = require('config');
//console.log("config.get('Customer.dbConfig')",config.get('Customer.dbConfig'))
//...
//const dbConfig = config.get('Customer.dbConfig');
//db.connect(dbConfig, ...);

// if (config.has('optionalFeature.detail')) {
//   const detail = config.get('optionalFeature.detail');
// }

// console.log(config.get('database_user'))
// console.log(config.get('database_user'))

//const config=require("config")

//console.log("XXX",config.get("database"))



const MONGODB_URI = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@cluster0.otwx1ks.mongodb.net/${config.DATABASE}`;
mongoose
  .connect(MONGODB_URI)
  .then(async (result) => {
    app.listen(config.PORT);
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
