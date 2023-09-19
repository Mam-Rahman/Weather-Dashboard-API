const weatherAPIURL = "https://api.openweathermap.org";
const weatherAPIKey = "4ed26e589d056c63d85c4699d03ecb12"
let searchHistory = []

let searchInput = $("#search-input")
let searchForm = $("#search-form");
let searchHistoryContainer = $("#history")

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
        }
    });


}

function submitSearchForm(event) {

    event.preventDefault();
    let search = searchInput.val().trim();

    fetchCoord(search);

}


searchForm.on("submit", submitSearchForm);









