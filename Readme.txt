# Test driven Bookstore
Write a sample implementation (console app is sufficient) write a solution with tests covering requirements below:
 
## Book
A book has a title, an author an ISBN-number and a book id
## Customer
A customer has a name and a customer id
## Order
An order consists of an order id, one customer id an order date and a list of books + quantity.
List may be empty.
Orders must always have a customer. Quantity must be greater than zero.
 
## Bookstore
The bookstore supports 
### Searching for books
Given a search string, return a list of books where author, title (partial match) or ISBN-number (exact match)1 matches the search string.
### Place order
Given a customer id and a list of book id:s + quantity generate an order with order date = now (exact time for traceability).