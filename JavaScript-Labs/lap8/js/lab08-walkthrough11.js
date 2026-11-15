// Country data for the lab walkthrough remains in js/travel-data.js.
function Country(name, iso, capital, population) {
  this.name = name;
  this.iso = iso;
  this.capital = capital;
  this.population = population;
}
var countryNames = countries;
countries = [
  new Country("Bahamas", "BS", "Nassau", 301790),
  new Country("Canada", "CA", "Ottawa", 33679000),
  new Country("Germany", "DE", "Berlin", 81802257),
];
countries.push(new Country("Spain", "ES", "Madrid", 46505963));
countries.push(new Country("United Kingdom", "GB", "London", 62348447));
var page = "<main class='site country-page'><header class='hero'><p class='eyebrow'>TRAVEL DATA · EXERCISE 8.11</p><h1>Countries</h1><p>Country objects, arrays, bracket notation and for...in</p></header><section class='country-grid'>";
for (var i = 0; i < countries.length; i++) {
  var c = countries[i];
  page += "<article class='country card'><img src='flags/" + c.iso + ".png' alt='Flag of " + c.name + "'><div><h2>" + c.name + "</h2>";
  page += "<p>";
  for (var temp in c) {
    page += "<strong>" + temp + ":</strong> " + c[temp] + "<br>";
  }
  page += "</p></div></article>";
}
page += "</section><footer><a href='index.html'>← Lab 08</a></footer></main>";
document.write(page);
