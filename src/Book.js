class Book {
  constructor(title, author, ISBN, id) {
    /*     const numericPart = ISBN.replace(/\D/g, ""); // Remove non-numerical characters
     */ if (
      typeof ISBN !== "string" ||
      (ISBN.length !== 10 && ISBN.length !== 13)
    ) {
      throw new Error("ISBN must be either 10 or 13 characters long");
    }

    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.id = id;
  }
}
module.exports = Book;
