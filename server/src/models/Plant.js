const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  category: String,
  color: [String],
  cultivationType: String,
  canBeColdPlanted: String,
  sowingDate: String,
  chosen: Boolean
});

module.exports = mongoose.model('Plant', plantSchema, 'plants');
