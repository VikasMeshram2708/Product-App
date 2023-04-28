const express = require("express");

const router = express.Router();

const db = require("../db");

const ProductSchema = require("../Models/Products");

const Products = db.get("products");

const fetchuser = require("../Middlewares/fetchuser");

// Make a new Products
router.post("/createProduct", fetchuser, async (req, res) => {
  try {
    const user = req.user._id; // user id
    const { name, description, image, price, category } = req.body;
    const data = await ProductSchema.validateAsync(req.body);
    if (data) {
      // insert to DB
      const newProducts = await Products.insert({
        user,
        name,
        description,
        image,
        price,
        category,
      });
      return res.status(201).json({
        message: newProducts,
      });
    }
    return res.status(422).json({
      message: "Please try again later!!!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Read All Products
router.get("/myProducts", fetchuser, async (req, res) => {
  try {
    const items = await Products.find({
      user: req.user._id,
    });
    if (items) {
      return res.status(201).json({
        message: items.reverse(), // give products in reverse order
      });
    }
    return res.status(422).json({
      message: "Not Products to display",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Update existing Products
// using PUT : /api/products/updateProduct/:id
router.put("/updateProduct/:id", fetchuser, async (req, res) => {
  try {
    const { id } = req.params;

    // valdate the body
    const value = await ProductSchema.validateAsync(req.body);

    const items = await Products.findOne({
      _id: id,
    });

    if (!items) {
      return res.status(422).json({
        message: "Not Found...",
      });
    }

    const updated = await Products.update(
      {
        _id: id,
      },
      {
        $set: value,
      }
    );
    return res.status(201).json({
      message: value,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// Delete existing product using DELETE : "/api/products/deleteProduct"
router.delete("/deleteProduct/:id", fetchuser, async (req, res) => {
  try {
    const { id } = req.params;

    const items = await Products.findOne({
      _id: id,
    });

    if (!items) {
      return res.status(422).json({
        message: "Not found..",
      });
    }
    await Products.remove({
      _id: id,
    });

    return res.status(201).json({
      message: "Success...",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
