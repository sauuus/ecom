const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema(
  {
    // owner : {
    //   type: ObjectID,
    //    required: true,
    //    ref: 'User'
    //  },
    products: [
      {
        productId: {
          type: ObjectID,
          ref: "products",
          required: true,
        },
        title: String,
        description: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
