const Product = require("../models/products");
const Image = require("../models/Image");

exports.getAllProducts = async (req, res) => {
  try {
    const pdRes = await Product.find({}).sort({ updatedAt: "desc" });
    res.json(pdRes);
  } catch (error) {
    console.log(error);
    res.send("Error" + error);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
 const { category, image, title, description, price } = req.body;
    
    
    const imgUrl = await Image.findOne({
      _id: image,
    });
    console.log(imgUrl);

    const imgPath = req.protocol + "://" + req.get("host") + "/" + imgUrl.name;
    const product = new Product({
      title,
      description,
      price,
      category,
      image: imgPath,
    });
    await product.save();
    console.log(product,'product')
    res.json(product);
  } catch (error) {
    console.log(error)
  }
};

// async (req, res) => {
//   try {
//     const { category, image, title, description, price } = req.body;
//     const imgUrl = await Image.findOne({
//       _id: image
//     });
//     console.log(imgUrl);

//     const imgPath = req.protocol + '://' + req.get('host') + "/" + imgUrl.name
//     const product = new Product({
//       title,
//       description,
//       price,
//       category,
//       image: imgPath,
//     });
//     const pdRes = await product.save();
//     res.json(pdRes);
//   } catch (error) {}
// };

exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetails = await Product.findOne({
      _id: productId,
    });

    if (productDetails) {
      console.log(productDetails, productId);
      res.json(productDetails);
    } else {
      throw new Error("product not found" + " -> " + productId);
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  let product = await Product.findById(req.params.productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }
  await product.remove();
  res.status(202).json({
    success: true,
    message: "Product Deleted",
  });
};
exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const productDetails = await Product.findById({ _id: productId });
    if (productDetails) {
      console.log(productDetails, productId);
      res.json(productDetails);
    } else {
      throw new Error("product not found" + " -> " + productId);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.updateProduct = async (req, res, next) => {
   
    let product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    product = await Product.findByIdAndUpdate( req.params.productId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(202).json({
      success: true,
      product,
    });
  };