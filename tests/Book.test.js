const Book = require("../src/Book");

test("Create a book with valid ISBN numbers", () => {
  const book1 = new Book("JavaScript Basics", "John Doe", "1234567890", "B001");
  const book2 = new Book(
    "Advanced JavaScript",
    "Jane Smith",
    "1234567890123",
    "B002"
  );

  expect(book1.title).toBe("JavaScript Basics");
  expect(book1.author).toBe("John Doe");
  expect(book1.ISBN).toBe("1234567890"); // Corrected ISBN value
  expect(book1.id).toBe("B001");

  expect(book2.title).toBe("Advanced JavaScript");
  expect(book2.author).toBe("Jane Smith");
  expect(book2.ISBN).toBe("1234567890123"); // Corrected ISBN value
  expect(book2.id).toBe("B002");
});

test("Throw error when creating a book with invalid ISBN numbers", () => {
  // Invalid ISBN length (less than 10 characters)
  expect(() => new Book("Invalid Book", "Author", "ISBN123", "B003")).toThrow(
    "ISBN must be either 10 or 13 characters long"
  );

  // Invalid ISBN length (more than 13 characters)
  expect(
    () => new Book("Invalid Book", "Author", "ISBN12345678901234", "B004")
  ).toThrow("ISBN must be either 10 or 13 characters long");
});
