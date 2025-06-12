const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    relatedTo: String
  },
  { collection: 'categoryDescriptions' }
);

module.exports = mongoose.model('Category', categorySchema);
