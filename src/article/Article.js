const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({  
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Article', articleSchema);