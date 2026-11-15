var daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
daysOfWeek.push("Saturday");
daysOfWeek.unshift("Sunday");
document.write("<section class='card'><h2>Array daysOfWeek</h2><p>");
for (var i = 0; i < daysOfWeek.length; i++) {
  document.write(daysOfWeek[i].length > 3 ? "<em>" + daysOfWeek[i] + "</em> " : daysOfWeek[i] + " ");
}
document.write("</p></section><section class='card'><h2>30-day calendar (month starts Sunday)</h2><table class='calendar'><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>");
for (var day = 1; day <= 30; day++) {
  if ((day - 1) % 7 === 0) document.write("<tr>");
  document.write("<td>" + day + "</td>");
  if (day % 7 === 0 || day === 30) document.write("</tr>");
}
document.write("</tbody></table></section>");
