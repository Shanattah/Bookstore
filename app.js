const readline = require("readline");
const BookstoreController = require("./src/BookstoreController");
const Book = require("./src/Book");
const Customer = require("./src/Customer");
const Order = require("./src/Order");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const controller = new BookstoreController();

controller.books.push(
  new Book(
    "Harry Potter and the Goblet of Fire",
    "J.K. Rowling",
    "9781408855683",
    "4"
  )
);
controller.books.push(
  new Book(
    "Harry Potter and the Chamber of Secrets",
    "J.K. Rowling",
    "9781408855669",
    "2"
  )
);
controller.books.push(
  new Book(
    "Harry Potter and the Prisoner of Azkaban",
    "J.K. Rowling",
    "9781408855676",
    "3"
  )
);
controller.books.push(
  new Book(
    "Harry Potter and the Order of the Phoenix",
    "J.K. Rowling",
    "9781408855690",
    "5"
  )
);
controller.books.push(
  new Book(
    "Harry Potter and the Half-Blood Prince",
    "J.K. Rowling",
    "9781408855706",
    "6"
  )
);
controller.books.push(
  new Book(
    "Harry Potter and the Deathly Hallows",
    "J.K. Rowling",
    "9781408855713",
    "7"
  )
);
controller.books.push(
  new Book(
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    "9781408855652",
    "1"
  )
);

controller.customers.push(new Customer("John Doe", "1"));
controller.customers.push(new Customer("Jane Smith", "2"));

function searchBooks() {
  rl.question("Enter search query: ", (query) => {
    const results = controller.searchBooks(query);
    if (results.length === 0) {
      console.log("No books found.");
    } else {
      console.log("Search Results:");
      results.forEach((book, index) => {
        console.log(
          `${index + 1}. Title: ${book.title}, Author: ${book.author}, ISBN: ${
            book.ISBN
          }`
        );
      });
    }
    rl.close();
  });
}

function placeOrder() {
  rl.question("Enter customer ID: ", (customerId) => {
    const customer = controller.findCustomerById(customerId);
    if (!customer) {
      console.log("Customer not found.");
      rl.close();
      return;
    }

    const items = []; // Array to accumulate items to be ordered

    const promptAddMoreBooks = () => {
      rl.question("Do you want to add more books? (y/n): ", (answer) => {
        if (answer.toLowerCase() === "y") {
          promptBook(); // Recursive call to add more books
        } else {
          // If no more books to add, place the order
          const options = {
            timeZone: "Europe/Stockholm",
            hour12: false,
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          };
          const orderDate = new Date().toLocaleString("sv-SE", options);
          const order = controller.placeOrder(customerId, items, orderDate);

          // Output order success message with all book details
          console.log("Order placed successfully.");
          console.log("Ordered books:");
          items.forEach((item) => {
            const book = controller.findBookById(item.bookId);
            console.log(`Title: ${book.title}, Quantity: ${item.quantity}`);
          });
          console.log(`Order Date: ${orderDate}`);
          rl.close();
        }
      });
    };

    const promptBook = () => {
      rl.question("Enter book ID and quantity (e.g., B001 2): ", (input) => {
        const [bookId, quantity] = input.split(" ");
        const book = controller.books.find(
          (book) => book.id.toUpperCase() === bookId.toUpperCase()
        );
        if (!book) {
          console.log(`Book with ID ${bookId} not found.`);
          promptBook(); // Prompt again for book ID and quantity
          return;
        }

        if (isNaN(quantity) || quantity <= 0) {
          console.log(`Invalid quantity for book with ID ${bookId}.`);
          promptBook(); // Prompt again for book ID and quantity
          return;
        }

        items.push({ bookId: book.id, quantity });

        promptAddMoreBooks(); // Ask if the user wants to add more books
      });
    };

    // Start prompting for the first book
    promptBook();
  });
}

function main() {
  rl.question(
    "Choose an option:\n1. Search for books\n2. Place an order\n",
    (option) => {
      switch (option.trim()) {
        case "1":
          searchBooks();
          break;
        case "2":
          placeOrder();
          break;
        default:
          console.log("Invalid option");
          rl.close();
      }
    }
  );
}

main();
