const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const connectToDB = require("./src/connection/database");
const cookieParser = require("cookie-parser");
const path = require("node:path");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ejs template configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Routers
const product_router = require("./src/routes/products/products_route");
const user_router = require("./src/routes/user/user_route");
const cart_router = require("./src/routes/cart/cart_route");

// Route mappings
app.use("/api/v1/products", product_router);
app.use("/api/v1/user", user_router);
app.use("/api/v1/cart", cart_router);



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



// Initialize database connection and start the server
connectToDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`Server Running on PORT ${process.env.PORT}`);
    })
  )
  .catch(() => console.log("Error Occured while establishing connection"));
