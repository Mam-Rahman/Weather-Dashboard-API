const weatherAPIURL = "https://api.openweathermap.org";
const weatherAPIKey = "4ed26e589d056c63d85c4699d03ecb12"
let searchHistory = []

let searchInput = $("#search-input")
let searchForm = $("#search-form");
let searchHistoryContainer = $("#history")
let todayContainer = $("#today")

function renderSearchHistory() {
    searchHistoryContainer.html("")

    for (let i = 0; i < searchHistory.length; i++) {
        let btn = $("<button>");
        btn.attr("type", "button");
        btn.addClass("history-btn btn-history");

        btn.attr("data-search", searchHistory[i]);
        btn.text(searchHistory[i]);
        searchHistoryContainer.append(btn);
    }
}

function appendSearchHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);

    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    renderSearchHistory()
}

function renderCurrentWeather(city, weatherData){
    let date = moment().format("D/M/YYYY")
    let tempC = weatherData["main"]["temp"];
    let windKph = weatherData["wind"]["speed"];
    let humidity = weatherData["main"]["humidity"];

    let iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    let iconDescription = weatherData.weather[0].description || weatherData[0].main

    let card = $("<div>")
    let cardBody = $("<div>")
    let weatherIcon = $("<img>")

    let heading = $("<h2>")
    let tempEl = $("<p>")
    let windEl = $("<p>")

    let humidityEl = $("<p>")

    card.attr("class", "card");

    cardBody.attr("class", "card-body");

    card.append(cardBody);

    heading.attr("class", "h3 card-title")
    tempEl.attr("class", "card-text")
    windEl.attr("class", "card-text")
    humidityEl.attr("class", "card-text");

    heading.text(`${city} (${date})`)
    weatherIcon.attr("src", iconUrl);
    weatherIcon.attr("alt", iconDescription);

    heading.append(weatherIcon);
    tempEl.text(`Temp ${tempC} C`)
    windEl.text(`Wind ${windKph} KPH`);
    humidityEl.text(`Humidity ${humidity} %`)
    cardBody.append(heading, tempEl, windEl, humidityEl);

    todayContainer.html("");
    todayContainer.append(card);


}

function fetchWeather(location){
    let latitude = location.lat;
    let longitude = location.lon;

    let city = location.name

    let queryWeatherURL = `${weatherAPIURL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherAPIKey}`;

    console.log(queryWeatherURL)

    console.log("Hello")
    $.ajax({
        url: queryWeatherURL,
        method: "GET"
    }).then(function(response){
        renderCurrentWeather(city, response.list[0])
        renderForecast(data.list);
    })

}

function fetchCoord(search) {
    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIKey}`;
    console.log(queryURL);
    fetch(queryURL, { method: "GET" })
    .then(function (data) {
        return data.json();
    })
    .then(function (response) {
        if (!response[0]) {
            alert("Location not found");
        } else {
         appendSearchHistory(search)
         fetchWeather(response[0])  
        }
    });
}

function initializeHistory(){
    let storedHistory = localStorage.getItem("search-history");

    if(storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    renderSearchHistory()
}

function submitSearchForm(event) {
    event.preventDefault();
    let search = searchInput.val().trim();

    fetchCoord(search);
    searchInput.val("");
}

function clickSearchHistory(event){
    if(!$(event.target).hasClass("btn-history")){
        return
    }
    let search = $(event.target).attr("data-search")
    
    fetchCoord(search);
    searchInput.val("")
}



initializeHistory()
searchForm.on("submit", submitSearchForm);
searchHistoryContainer.on("click", clickSearchHistory)









