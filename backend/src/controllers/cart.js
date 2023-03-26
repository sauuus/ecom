const Cart = require("../models/cart");
const Product = require("../models/products");

exports.getAllCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {}
};

// random = no product
// product availabe -> but not in cart => need to push to cart arr
// products available in cart -> need to increase quantity.

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById({ _id: productId });
    if (!product) {
      res.json({ message: "product not found" });
      return;
    }
    //need to pass productId
    const cart = await Cart.findById();
    const cartItems = cart?.products || 0;
    const {title, description, price} = product;

    //if that product is already in cart
    if (cartItems.length > 0) {
      const idx = cartItems.findIndex(
        (product) => product.productId == productId
      );
      
      if (idx > -1) {
        let cartItem = cartItems[idx];
        cartItem.quantity += quantity;
        cartItems[idx] = cartItem;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cartItems.push({ productId, title, description, quantity, price });
        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //create a new cart
      const newCart = new Cart({
        products: [{ productId, title, description, quantity, price }],
      });
      const cartRes = await newCart.save();
      return res.status(201).json(cartRes);
    }
  } catch (error) {
    res.status(400).json({err: error})
  }
};
