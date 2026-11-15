// Exercise 9.3: create and append a paragraph, then remove one list item.
var first = document.getElementById("first");
var text = document.createTextNode("This paragraph was created with JavaScript and appended to #first.");
var p = document.createElement("p");
p.appendChild(text);
first.appendChild(p);
var icons = document.getElementById("iconList");
icons.removeChild(document.getElementById("deleteThisOne"));
