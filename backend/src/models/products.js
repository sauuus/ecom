// product schema => _id, category, image, title, description, price
const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    // type: ObjectID,
    // ref: "Image",
    // required: true,
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("products", productSchema);
