require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');



const MONGODB_URI = `mongodb+srv://${process.env.MONDOGB_USERNAME}:${
  process.env.MONDOGB_PASSWORD
}@cluster0.otwx1ks.mongodb.net/${process.env.MONDOGB_DATABASE}`;

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(result => {
      app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });