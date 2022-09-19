
var userSearch = $(".userInput")[0]
var currentCityCond = document.querySelectorAll(".curCty")[0].children
 
console.log(currentCityCond)

function getWeather() {    
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + userSearch.value +'&units=imperial&appid=cb4022af9ee9d0ebd691e41110e4c85b')
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            (currentCityCond[1].children[0]).innerHTML = "Temp: " + data.main.temp+ "&deg; F";
            (currentCityCond[1].children[1]).innerHTML = "Wind: " + data.wind.speed+ " MPH";
            (currentCityCond[1].children[2]).innerHTML = "Humidity: " + data.main.humidity+ " %"; 
            console.log(data);
            
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


