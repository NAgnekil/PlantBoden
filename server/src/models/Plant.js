const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  category: String,
  height: String,
  color: [String],
  isDryable: Boolean,
  sowWeeksBeforeFrost: String,
  cultivationType: String,
  sowingDate: String,
  lightGermination: Boolean,
  plantOut: String,
  plantOutComment: String,
  plantDistanceInCm: String,
  plantDistanceImg: String,
  plantSupport: Boolean,
  fitForGreenhouse: Boolean,
  toppedOff: Boolean,
  pests: [String],
  cutAndComeAgain: Boolean,
  mediumProducer: Boolean,
  oneAndDone: Boolean,
  hardiness: String,
  canBeColdPlanted: String,
  harvestPeriod: [Object],
  chosen: Boolean,
  mainImg: String,
  additionalImages: [String],
  additionalComments: String,
  description: String
});

module.exports = mongoose.model('Plant', plantSchema, 'plants');
