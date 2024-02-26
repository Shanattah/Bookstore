const BookstoreController = require("../src/BookstoreController");
const Book = require("../src/Book");
const Customer = require("../src/Customer");
const Order = require("../src/Order");

test("BookstoreController constructor initializes properties correctly", () => {
  const controller = new BookstoreController();
  expect(controller.books).toEqual([]);
  expect(controller.orders).toEqual([]);
});

test("Search for books by title, author, or ISBN", () => {
  const controller = new BookstoreController();
  const book1 = new Book("JavaScript Basics", "John Doe", "1234567890", "B001");
  const book2 = new Book(
    "Advanced JavaScript",
    "Jane Smith",
    "1234567890123",
    "B002"
  );
  const book3 = new Book(
    "Node.js Essentials",
    "Alice Johnson",
    "1234567890111",
    "B003"
  );
  controller.books = [book1, book2, book3];

  expect(controller.searchBooks("JavaScript")).toEqual([book1, book2]);

  expect(controller.searchBooks("Alice")).toEqual([book3]);

  expect(controller.searchBooks("1234567890")).toEqual([book1]);
});

test("Place an order with a customer ID and list of book IDs + quantity", () => {
  const controller = new BookstoreController();
  controller.customers.push(new Customer("John Doe", "C001")); // Add customer to the customers array
  const book1 = new Book("JavaScript Basics", "John Doe", "1234567890", "B001");
  const book2 = new Book(
    "Advanced JavaScript",
    "Jane Smith",
    "1234567890123",
    "B002"
  );
  controller.books = [book1, book2];

  const orderDate = new Date();
  const order = controller.placeOrder(
    "C001",
    [
      { bookId: "B001", quantity: 2 },
      { bookId: "B002", quantity: 1 },
    ],
    orderDate
  );
  expect(order).toBeInstanceOf(Order);
  expect(order.customerId).toBe("C001");
  expect(order.orderDate).toEqual(orderDate);
  expect(order.items).toEqual([
    { bookId: "B001", quantity: 2 },
    { bookId: "B002", quantity: 1 },
  ]);
});

test("Place an order with invalid customer ID or book IDs", () => {
  const controller = new BookstoreController();
  controller.customers.push(new Customer("John Doe", "C001")); // Add customer to the customers array
  const book1 = new Book("JavaScript Basics", "John Doe", "1234567890", "B001");
  const book2 = new Book(
    "Advanced JavaScript",
    "Jane Smith",
    "1234567890123",
    "B002"
  );
  controller.books = [book1, book2];

  // Place an order with invalid customer ID
  expect(() =>
    controller.placeOrder("C002", [{ bookId: "B001", quantity: 2 }], new Date())
  ).toThrow("Customer not found");

  // Place an order with invalid book ID
  expect(() =>
    controller.placeOrder("C001", [{ bookId: "B003", quantity: 2 }], new Date())
  ).toThrow("Book not found");
});

test("Place an order with 0 quantity", () => {
  const controller = new BookstoreController();
  controller.customers.push(new Customer("John Doe", "C001")); // Add customer to the customers array
  const book1 = new Book("JavaScript Basics", "John Doe", "1234567890", "B001");
  const book2 = new Book(
    "Advanced JavaScript",
    "Jane Smith",
    "1234567890123",
    "B002"
  );
  controller.books = [book1, book2];

  const orderDate = new Date();
  // Attempt to place an order with 0 quantity for a book
  expect(() =>
    controller.placeOrder("C001", [{ bookId: "B001", quantity: 0 }], orderDate)
  ).toThrow("Quantity must be greater than 0");
});
