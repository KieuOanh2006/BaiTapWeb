var count = 1;
var output = "Hello from an external JavaScript file!";
var temp = count + 1;
count++;
document.write("<p>" + output + "</p>");
document.write("<p>count = " + count + "</p>");
console.log("count:", count);
console.warn("output:", output);
console.error("temp (demo):", temp);
