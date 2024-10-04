import Product from "../model/product.model.js";
import mongoose from "mongoose";
export const createproduct = async (req, res) => {
  const { name, price, image } = req.body;

  try {
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "please provide all fields" });
    }

    const newproduct = new Product({ name, price, image });
    await newproduct.save();
    return res.status(201).json({ success: true, data: newproduct });
  } catch (error) {
    console.log("error in create product : ", error.message);
    return res.status(500).json("server error");
  }
};

export const getproduct = async (req, res) => {
  try {
    const product = await Product.find({});
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "product not found" });
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log(`error in get product ${error.message}`);
    return res.status(500).json("server error");
  }
};

export const updateproduct = async (req, res) => {
  const product = {};
  const { id } = req.params;
  const { name, price, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    if (name) product.name = name;
    if (name) product.price = price;
    if (name) product.image = image;
    const newproduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!newproduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    return res.status(201).json({ success: true, product: newproduct });
  } catch (error) {
    console.log(`error in update product ${error.message}`);
    return res.status(500).json("server error");
  }
};

export const deleteproduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    console.log(`error in delete product ${error.message}`);
    return res.status(500).json("server error");
  }
};
