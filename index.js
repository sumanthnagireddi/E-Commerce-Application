const express = require("express");
const app = express();
require("dotenv").config();
const connectToDB = require("./src/connection/database");
const product_routes = require("./src/routes/products/products_route");

connectToDB()
  .then(() => console.log("Connection Established"))
  .catch(() => console.log("Error Occured while establishing connection"));

app.use("/api/v1/products", product_routes);

// Middleware to handle invalid routes (404 errors)
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server Running on PORT ${process.env.PORT}`);
});
