const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  category: String,
  cardHeadline: String,
  cardDescription: String,
  title: String,
  description: String,
  preamble: String,
  img: String,
  illustration: String,
  mainArticle: String,
  conclusion: String
});

module.exports = mongoose.model('Article', articleSchema);
