class Order {
  constructor(id, customerId, orderDate, items) {
    this.id = id;
    this.customerId = customerId;
    this.orderDate = orderDate;
    this.items = items;
  }
}

module.exports = Order;
