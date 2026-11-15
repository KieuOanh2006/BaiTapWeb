// Exercise 9.5: this script is loaded from the head, before the body exists.
window.addEventListener("load", function () {
  var divToGet = document.getElementById("div1");
  alert(divToGet.innerHTML);
});
