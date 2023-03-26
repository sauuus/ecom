const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: String,
  imgUrl: String
});

module.exports = new mongoose.model('Image', imageSchema);
