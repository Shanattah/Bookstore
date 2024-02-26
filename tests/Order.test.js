const Order = require("../src/Order");

test("Order constructor initializes properties correctly", () => {
  const order = new Order("O123", "C123", new Date(), []);
  expect(order.id).toBe("O123");
  expect(order.customerId).toBe("C123");
  expect(order.orderDate).toBeInstanceOf(Date);
  expect(order.items).toEqual([]);
});
