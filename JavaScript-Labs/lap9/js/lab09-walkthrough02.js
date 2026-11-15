// Final Exercise 9.2 result: color each element node inside #stories.
var stories = document.getElementById("stories");
for (var i = 0; i < stories.childNodes.length; i++) {
  if (stories.childNodes[i].nodeType === 1) {
    stories.childNodes[i].style.backgroundColor = "#b7e4c7";
  }
}
