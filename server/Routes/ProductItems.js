const express = require("express");
const router = express.Router();

const products = [
  {
    id: Math.random(),
    title: "Ergonomic Office Chair",
    description:
      "Adjustable height, 360-degree swivel, comfortable padding, perfect for home office.",
    price: 450,
    imageURL: "https://is.gd/bAnbhY",
    categories: "furniture",
  },
  {
    id: Math.random(),
    title: "Comfortable Sofa",
    description:
      "A piece of furniture for seating or lounging, typically with a back and arms, designed for comfort and relaxation.",
    price: 1000,
    imageURL: "https://is.gd/kG8wkM",
    categories: "furniture",
  },
  {
    id: Math.random(),
    title: "iPhone 13 Pro",
    description:
      "Latest model, 6.1-inch Super Retina XDR display, A15 Bionic chip, 128GB storage.",
    price: 990,
    imageURL: "https://is.gd/yj0qgK",
    categories: "electronics",
  },
  {
    id: Math.random(),
    title: "MacBook",
    description:
      "Apple's laptop computer line, known for sleek design, high performance, and compatibility with other Apple products.",
    price: 70,
    imageURL: "https://is.gd/MHb2Q2",
    categories: "electronics",
  },
  {
    id: Math.random(),
    title: "Bhagavad Gita",
    description:
      "A Hindu scripture that contains the teachings of Lord Krishna to Arjuna, emphasizing the path of righteousness and spiritual enlightenment.",
    price: 908,
    imageURL: "https://is.gd/oSkeVv",
    categories: "books",
  },
  {
    id: Math.random(),
    title: "The Great Gatsby",
    description:
      "A novel by F. Scott Fitzgerald, published in 1925, a classic of American literature.",
    price: 150,
    imageURL: "https://is.gd/LhPYl3",
    categories: "books",
  },
  {
    id: Math.random(),
    title: "Dhoti",
    description:
      "A traditional Indian garment, typically made of cotton, that is wrapped around the waist and legs and worn by men.",
    price: 499,
    imageURL: "https://is.gd/DhasXl",
    categories: "clothing",
  },
  {
    id: Math.random(),
    title: "Saree",
    description:
      "A traditional Indian garment worn by women, consisting of a long piece of fabric draped around the body with one end over the head.",
    price: 999,
    imageURL: "https://is.gd/hEWyvk",
    categories: "clothing",
  },
];

router.get("/allItems", (req, res) => {
  let filteredProducts = products;
  console.log(req.query);

  // category filter if provided
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categories === req.query.category
    );
  }
  // price range filter if provided
  if (req.query.sort) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseInt(req.query.sort)
    );
  }
  console.log("filteredProducts", filteredProducts);
  res.json(filteredProducts);
});

module.exports = router;
