
const weatherAPIURL = "https://api.openweathermap.org";
const weatherAPIKey = "4ed26e589d056c63d85c4699d03ecb12"


let searchInput = $("#search-input")
let searchForm =$("#search-form");


function fetchCoord(search){
    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIKey}`;

    fetch(queryURL).then(function(data){
        return data.json()
    }).then(function(response){
        console.log(response);
    })


}

function submitSearchForm(event){

    event.preventDefault();
    let search = searchInput.val().trim()

    fetchCoord(search);

}


searchForm.on("submit", submitSearchForm);









