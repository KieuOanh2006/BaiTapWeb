// Exercise 9.6: reload with a breakpoint on the alert line, then inspect e.target.
window.addEventListener("load", function () {
  var divs = document.querySelectorAll(".movingDiv");
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener("mouseover", function (e) {
      alert("triggered by " + e.target.id);
    });
  }
});
