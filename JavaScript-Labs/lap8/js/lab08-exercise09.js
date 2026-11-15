var isCanadian = true;
function taxRate() { return isCanadian ? 0.05 : 0; }
function calculateTax(price, quantity) { return price * quantity * taxRate(); }
function calculateTotal(price, quantity) { return price * quantity + calculateTax(price, quantity); }
// Alternative forms used in the lesson:
function calculateTaxNested(price, quantity) {
  function taxRateNested() { return isCanadian ? 0.05 : 0; }
  return price * quantity * taxRateNested();
}
var taxRateExpression = function () { return isCanadian ? 0.05 : 0; };
var calculateTaxAnonymous = function (price, quantity) { return price * quantity * taxRateExpression(); };
function applyCalculation(calculation, price, quantity) { return calculation(price, quantity); }
