const Image = require("../models/Image");

exports.getAllImages = async (req, res) => {
  try {
    const cart = await Image.find();
    res.json(cart);
  } catch (error) {}
};


exports.uploadImage = async (req, res) => {
  try {
    const {path, filename } = req.file;
    const image = new Image({
      name: filename,
      imgUrl: path
    })
    await image.save();
    res.json({
      message: "uploaded successfully!!!",
      image
    })
  } catch (error) {}
};