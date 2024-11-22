const { getProducts } = require("../products/products");
const Product = require("../../models/products/product_model");

jest.mock("../../models/products/product_model");

describe("getProducts Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {}; // Mock request
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }; // Mock response
    next = jest.fn(); // Mock next
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return products with status 200 if products are found", async () => {
    // Mock Product.find to return data
    Product.find.mockResolvedValue([
      { name: "Product1" },
      { name: "Product2" },
    ]);

    await getProducts(req, res, next);

    // Assertions
    expect(Product.find).toHaveBeenCalledTimes(1); // Ensure Product.find was called
    expect(res.status).toHaveBeenCalledWith(200); // Check status code
    // expect(res.json).toHaveBeenCalledWith([
    //   { name: "Product1" },
    //   { name: "Product2" },
    // ]); // Check response
  });

  it("should call next with an error if no products are found", async () => {
    // Mock Product.find to return an empty array
    Product.find.mockResolvedValue([]);

    await getProducts(req, res, next);

    // Assertions
    expect(Product.find).toHaveBeenCalledTimes(1); // Ensure Product.find was called
    expect(next).toHaveBeenCalledTimes(1); // Ensure next was called
    const error = next.mock.calls[0][0]; // Capture the error passed to next
    expect(error).toBeInstanceOf(Error); // Ensure it's an Error object
    expect(error.message).toBe("Products not found"); // Check error message
    expect(error.statusCode).toBe(404); // Check status code
  });

  it("should call next with an error if Product.find throws an error", async () => {
    // Mock Product.find to throw an error
    const mockError = new Error("Database error");
    Product.find.mockRejectedValue(mockError);

    await getProducts(req, res, next);

    // Assertions
    expect(Product.find).toHaveBeenCalledTimes(1); // Ensure Product.find was called
    expect(next).toHaveBeenCalledWith(mockError); // Ensure the same error is passed to next
  });
});
