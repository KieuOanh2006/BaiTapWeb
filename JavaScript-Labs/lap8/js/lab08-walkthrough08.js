function outputBox(num) {
  var box = "";
  for (var i = 1; i <= num; i++) {
    box += "<div class='" + boxClass + "'>This is box " + i + "</div>";
  }
  return box;
}
var boxClass = "box";
