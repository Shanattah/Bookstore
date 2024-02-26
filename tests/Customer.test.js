const Customer = require("../src/Customer");

test("Customer constructor initializes properties correctly", () => {
  const customer = new Customer("John Doe", "C123");
  expect(customer.name).toBe("John Doe");
  expect(customer.id).toBe("C123");
});
