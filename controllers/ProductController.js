const { request } = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getSingleProduct = async (request, response) => {
  try {
    const foundProduct = await Product.findById(request.param);

    if (!foundProduct)
      return response
        .status(404)
        .send({ success: false, msg: "Poduct was not found" });

    return response.status(200).send({ success: true, product: foundProduct });
  } catch (err) {
    console.error(err);
    return response.status(500).send({ success: false, msg: "Server Error" });
  }
};

exports.updateProduct = async (request, response) => {
  try {
    const { body, param } = request;

    const findProduct = await Product.findById(param);
    if (!findProduct)
      return response
        .status(404)
        .send({ success: false, msg: "Product was not found" });

    const information = {
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image,
      category: body.category,
    };

    const updateProduct = await Product.updateOne(findProduct._id, information);
    if (!updateProduct)
      return response
        .status(400)
        .send({ success: false, msg: "Error occured in updating" });

    return response
      .status(200)
      .send({ success: true, updatedProduct: updateProduct });
  } catch (err) {
    console.error(err);
    return response.status(500).send({ success: false, msg: "Server Error" });
  }
};

exports.deleteProduct = async (request, response) => {
  try {
    const { param } = request;

    const existingProduct = await Product.findById(param);

    if (!existingProduct)
      return response
        .status(404)
        .send({
          success: false,
          msg: "Product that you're trying to delete does not exist",
        });

    const deletedProduct = await Product.findByIdAndDelete(existingProduct._id);

    if (!deletedProduct)
      return response
        .status(400)
        .send({ success: false, msg: "Error occurred in product deletion" });

    return response
      .status(200)
      .send({
        success: true,
        msg: "Successfully Deleted",
        deletedProduct: deletedProduct
      });
  } catch (err) {
    console.error(err);
    return response
      .status(500)
      .send({ success: false, msg: "Server error occured" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.products.push(req.body);
      await cart.save();
      res.json(cart);
    } else {
      const newCart = new Cart({ userId: req.user.id, products: [req.body] });
      await newCart.save();
      res.json(newCart);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, userId: req.user.id });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};