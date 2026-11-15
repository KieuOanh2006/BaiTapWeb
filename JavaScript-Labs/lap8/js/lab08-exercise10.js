// Objects with the built-in constructor and object literal notation.
var firstObject = new Object();
firstObject.name = "Notebook";
firstObject.price = 15.00;
firstObject["quantity"] = 2;
var secondObject = { name: "Pen", price: 2.50, quantity: 5 };
// Constructor function. The lowercase name follows the exercise's order() example.
function order(product, price, quantity) {
  this.product = product;
  this.price = price;
  this.quantity = quantity;
  this.total = function () { return this.price * this.quantity; };
  this.output = function () {
    return "<tr><td>" + this.product + "</td><td>$" + this.price.toFixed(2) +
      "</td><td>" + this.quantity + "</td><td>$" + this.total().toFixed(2) + "</td></tr>";
  };
}
var example1 = new order("Notebook", 15.00, 2);
var example2 = new order("Pen", 2.50, 5);
