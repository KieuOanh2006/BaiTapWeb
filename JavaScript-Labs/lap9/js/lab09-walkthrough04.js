function simpleHandler(event) {
  var content = document.getElementById("content");
  var button = document.getElementById("testButton");
  if (button.innerHTML === "Hide") {
    button.innerHTML = "Show";
    content.className = "makeItDisappear";
    window.setTimeout(function () { content.style.display = "none"; }, 1000);
  } else {
    button.innerHTML = "Hide";
    content.style.display = "block";
    window.setTimeout(function () { content.className = "makeItNormal"; }, 500);
  }
}
var btn = document.getElementById("testButton");
btn.addEventListener("click", simpleHandler);
var img = document.getElementById("mainImage");
img.addEventListener("mouseover", function () { img.className = "makeItGray"; });
img.addEventListener("mouseout", function () { img.className = "makeItNormal"; });
