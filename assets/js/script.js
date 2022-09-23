
var userSearch = $(".userInput")[0]
var currentCityCond = document.querySelectorAll(".curCty")[0].children
 
console.log(currentCityCond)

function getWeather() {    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userSearch.value +'&units=imperial&appid=cb4022af9ee9d0ebd691e41110e4c85b')
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            var coordinates = Object.values(data.coord);
            
            console.log(data)
            console.log(coordinates);
            coordinates.forEach(value => {
                console.log(value)
                window.localStorage.setItem(userSearch.value, JSON.stringify(coordinates))
            });
            console.log(JSON.parse(localStorage.getItem(userSearch.value))); 
            (currentCityCond[1].children[0]).innerHTML = "Temp: " + data.main.temp+ "&deg; F";
            (currentCityCond[1].children[1]).innerHTML = "Wind: " + data.wind.speed+ " MPH";
            (currentCityCond[1].children[2]).innerHTML = "Humidity: " + data.main.humidity+ " %";
            getFiveDay();                       
  })  
}

function getFiveDay() {
    var coordinates = JSON.parse(localStorage.getItem(userSearch.value))
    console.log(coordinates[0]);
    console.log(coordinates[1]);
    fetch('https://api.openweathermap.org/data/3.0/onecall?lat='  + coordinates[1] + '&lon=' + coordinates[0] + '&exclude=current,hourly,minutely,alerts&units=imperial&appid=cb4022af9ee9d0ebd691e41110e4c85b')

    .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            var fcdate = document.querySelectorAll(".fcdate");
            var fccond = document.querySelectorAll(".fccond");
            var fctemp = document.querySelectorAll(".fctemp");
            var fcwind = document.querySelectorAll(".fcwind");
            var fchum = document.querySelectorAll(".fchum");     
            console.log(data.daily)
            data.daily.forEach((value, index) => {
                if (index < 5) {
                    var date = new Date(value.dt * 1000).toLocaleDateString("en-US");
                    console.log(value.temp.max);
                    console.log(date);
                    console.log(document.querySelectorAll(".fccond"))
                    fcdate[index].textContent = date
                    fccond[index].innerHTML = '<img src="http://openweathermap.org/img/wn/' + value.weather[0].icon + '@2x.png"></img>' 
                    fctemp[index].innerHTML = "Temp: " + value.temp.max + " &deg; F";
                    fcwind[index].innerHTML = "Wind: " + value.wind_speed + " MPH";
                    fchum[index].innerHTML = "Humidity: " + value.humidity + "%"
                }
            })
                             
  })
}



function searchCity(event) {
    console.log(event);
    currentCityCond[0].textContent = userSearch.value
    
    $(".cities").append('<button class= "list-group-item rounded-3 py-3">'+userSearch.value+ '</button>') 
    console.log(userSearch.value)
    getWeather();
    
};

$(".btn").on("click", searchCity);


