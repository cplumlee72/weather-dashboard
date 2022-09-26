var userSearch = $(".userInput")[0];
var currentCityCond = document.querySelectorAll(".curCty")[0].children;
var cityArr = JSON.parse(window.localStorage.getItem("newCity"));

function getWeather() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      userSearch.value +
      "&units=imperial&appid=cb4022af9ee9d0ebd691e41110e4c85b"
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      var coordinates = Object.values(data.coord);

      console.log(data);
      coordinates.forEach((value) => {
        window.localStorage.setItem(
          userSearch.value + "coords",
          JSON.stringify(coordinates)
        );
      });
      currentCityCond[1].children[0].innerHTML =
        '<img src="http://openweathermap.org/img/wn/' +
        data.weather[0].icon +
        '@2x.png"></img>';
      currentCityCond[1].children[1].innerHTML =
        "Temp: " + data.main.temp + "&deg; F";
      currentCityCond[1].children[2].innerHTML =
        "Wind: " + data.wind.speed + " MPH";
      currentCityCond[1].children[3].innerHTML =
        "Humidity: " + data.main.humidity + " %";
      getFiveDay();
    });
}

function getFiveDay() {
  var coordinates = JSON.parse(
    localStorage.getItem(userSearch.value + "coords")
  );
  fetch(
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
      coordinates[1] +
      "&lon=" +
      coordinates[0] +
      "&exclude=current,hourly,minutely,alerts&units=imperial&appid=cb4022af9ee9d0ebd691e41110e4c85b"
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      var fcdate = document.querySelectorAll(".fcdate");
      var fccond = document.querySelectorAll(".fccond");
      var fctemp = document.querySelectorAll(".fctemp");
      var fcwind = document.querySelectorAll(".fcwind");
      var fchum = document.querySelectorAll(".fchum");
      data.daily.forEach((value, index) => {
        if (index < 5) {
          var date = new Date(value.dt * 1000).toLocaleDateString("en-US");
          fcdate[index].textContent = date;
          fccond[index].innerHTML =
            '<img src="http://openweathermap.org/img/wn/' +
            value.weather[0].icon +
            '@2x.png"></img>';
          fctemp[index].innerHTML = "Temp: " + value.temp.max + " &deg; F";
          fcwind[index].innerHTML = "Wind: " + value.wind_speed + " MPH";
          fchum[index].innerHTML = "Humidity: " + value.humidity + "%";
        }
      });
    });
}

function searchCity(event) {
  if (userSearch.value) {
    if (cityArr.indexOf(userSearch.value.toUpperCase()) === -1) {
      cityArr.push(userSearch.value.toUpperCase());
      window.localStorage.setItem("newCity", JSON.stringify(cityArr));
      $(".cities").append(
        '<button class= "list-group-item rounded-3 py-3">' +
          userSearch.value.toUpperCase() +
          "</button>"
      );
    } else {
      console.log("ERROR");
    }

    currentCityCond[0].textContent = userSearch.value.toUpperCase();
    getWeather();
  } else alert("You must input a city to search for!");
}

function generateButtons() {
  var cityArr = JSON.parse(window.localStorage.getItem("newCity"));
  cityArr.forEach((Element) => {
    console.log(Element);
    if (Element) {
      $(".cities").append(
        '<button class="list-group-item rounded-3 py-3 ctybtn">' +
          Element +
          "</button>"
      );
    }
  });
  $(".ctybtn").on("click", cityButtonHandler);
}

function setStorage() {
  var startCities = ["DALLAS", "DENVER"];
  if (!window.localStorage.getItem("newCity")) {
    window.localStorage.setItem("newCity", JSON.stringify(startCities));
  }

  generateButtons();
}

function cityButtonHandler(event) {
  console.log(event);
  currentCityCond[0].textContent = event.target.textContent;
  userSearch.value = event.target.textContent;
  getWeather();
}

window.addEventListener("load", setStorage);
$(".btn").on("click", searchCity);
