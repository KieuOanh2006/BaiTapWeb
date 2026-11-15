/* Set up the form submit handler once the DOM is ready. */
function init() {
  document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
}
window.addEventListener("load", init);

function checkForEmptyFields(e) {
  var errorArea = document.getElementById("errors");
  errorArea.className = "hidden";
  errorArea.innerHTML = "";
  var fields = document.querySelectorAll("input[type=text], input[type=password]");
  var fieldList = [];
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].value == null || fields[i].value.trim() === "") {
      e.preventDefault();
      fieldList.push(fields[i]);
    }
  }
  if (fieldList.length > 0) {
    var msg = "The following fields can't be empty: ";
    for (var j = 0; j < fieldList.length; j++) {
      msg += fieldList[j].id + (j < fieldList.length - 1 ? ", " : "");
    }
    errorArea.innerHTML = "<p>" + msg + "</p>";
    errorArea.className = "visible";
    fieldList[0].focus();
  }
}
