const Book = require("./Book");
const Customer = require("./Customer");
const Order = require("./Order");

class BookstoreController {
  constructor() {
    this.books = [];
    this.orders = [];
    this.customers = []; // Add a customers array to store customer objects
  }

  searchBooks(searchString) {
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchString.toLowerCase()) ||
        book.author.toLowerCase().includes(searchString.toLowerCase()) ||
        book.ISBN.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  placeOrder(customerId, bookQuantities, orderDate) {
    const customer = this.findCustomerById(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const items = [];
    for (const { bookId, quantity } of bookQuantities) {
      const book = this.findBookById(bookId);
      if (!book) {
        throw new Error("Book not found");
      }
      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
      items.push({ bookId, quantity });
    }

    const orderId = `O${this.orders.length + 1}`;
    const order = new Order(orderId, customerId, orderDate, items);
    this.orders.push(order);
    return order;
  }

  findCustomerById(customerId) {
    return this.customers.find((customer) => customer.id === customerId);
  }

  findBookById(bookId) {
    return this.books.find((book) => book.id === bookId);
  }
}

module.exports = BookstoreController;
