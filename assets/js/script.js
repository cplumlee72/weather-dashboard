var weatherurl = 'api.openweathermap.org/data/2.5/forecast?q={city name}&units=standard&appid=cb4022af9ee9d0ebd691e41110e4c85b'
var userSearch = $(".userInput")[0]
var currentCityCond = document.querySelectorAll(".curCty")[0]
 
console.log(currentCityCond.children)

function searchCity(event) {
    console.log(event);
    currentCityCond.children[0].textContent = userSearch.value
    $(".cities").append('<button class= "list-group-item rounded-3 py-3">'+userSearch.value+'</button>') 
    console.log(userSearch.value)
};

$(".btn").on("click", searchCity);


