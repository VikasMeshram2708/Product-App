const express = require("express");
const router = express.Router();

const products = [
  {
    id: Math.random(),
    title: "Ergonomic Office Chair",
    description:
      "Adjustable height, 360-degree swivel, comfortable padding, perfect for home office.",
    price: 129.99,
    imageURL: "https://is.gd/bAnbhY",
    categories: "furniture",
  },
  {
    id: Math.random(),
    title: "iPhone 13 Pro",
    description:
      "Latest model, 6.1-inch Super Retina XDR display, A15 Bionic chip, 128GB storage.",
    price: 999.99,
    imageURL: "https://is.gd/yj0qgK",
    categories: "electronics",
  },
  {
    id: Math.random(),
    title: "The Great Gatsby",
    description:
      "A novel by F. Scott Fitzgerald, published in 1925, a classic of American literature.",
    price: 9.99,
    imageURL: "https://is.gd/LhPYl3",
    categories: "books",
  },
  {
    id: Math.random(),
    title: "Levi's Men's 501 Original Fit Jeans",
    description:
      "Button-fly, straight-leg jeans with classic five-pocket styling, made of 100% cotton denim.",
    price: 59.5,
    imageURL: "https://is.gd/egKY2L",
    categories: "clothing",
  },
];

router.get("/allItems", (req, res) => {
  res.json(products);
});

module.exports = router;
