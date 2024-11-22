# Real-Time Shopping Cart Application

## Description

This is a real-time shopping cart application built using **Express.js**, **EJS**, **Socket.IO**, and **MongoDB**. The app provides functionality for managing a shopping cart with real-time updates using WebSockets, allowing users to add, remove, or update cart items seamlessly.

---

https://github.com/sumanthnagireddi/E-Commerce-Application;

username:admin;
password:1234

## Features

- **User Authentication**: Secure user login and session management.
- **Product Management**: View and manage products.
- **Real-Time Cart Updates**: Live cart synchronization using WebSocket (Socket.IO).
- **Dynamic UI Rendering**: EJS-based templates for dynamic content rendering.
- **RESTful API**: Exposed API endpoints for cart, user, and product management.
- **Error Handling**: Global error handling for robust application performance.

---

## Technologies Used

- **Backend**: 
  - [Express.js](https://expressjs.com/) - Web application framework.
  - [Socket.IO](https://socket.io/) - Real-time communication.
- **Frontend**: 
  - [EJS](https://ejs.co/) - Templating engine.
- **Database**: 
  - [MongoDB](https://www.mongodb.com/) - NoSQL database.
- **Environment Management**:
  - [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable configuration.

---

## Project Structure

src/
├── connection/
│   └── database.js         # Database connection setup
├── controllers/
│   ├── cart/               # Cart-related logic
│   ├── products/           # Product-related logic
│   └── user/               # User-related logic
├── models/
│   └── user_model.js       # User schema and model
├── routes/
│   ├── cart/               # Cart route handlers
│   ├── products/           # Product route handlers
│   └── user/               # User route handlers
├── utils/
│   └── getAggregate.js     # Utility for aggregate calculations
└── views/
    └── cart.ejs            # Cart page view


## Setup Instructions

### Prerequisites

- **Node.js** (>= 16.x)
- **MongoDB** (running locally or on a cloud service)
- **npm** or **yarn**

## API Endpoints
### User Routes
## API Routes Documentation

### User Routes

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| POST   | /api/v1/user/login | Login user          |
| POST   | /api/v1/user/signup| Register a new user |

### Product Routes

| Method | Endpoint                | Description        |
|--------|-------------------------|--------------------|
| GET    | /api/v1/products        | Get all products   |
| GET    | /api/v1/products/:id    | Get product by ID  |

### Cart Routes

| Method | Endpoint                | Description         |
|--------|-------------------------|---------------------|
| GET    | /api/v1/cart            | Get cart items      |
| POST   | /api/v1/cart/add        | Add item to cart    |
| POST   | /api/v1/cart/remove     | Remove item from cart|

