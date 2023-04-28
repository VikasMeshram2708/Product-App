const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/products", require("./Routes/products"));
app.use("/api/items", require("./Routes/ProductItems"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listenint at http://localhost:${port}`);
});
