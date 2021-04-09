var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lon=76.6122&lat=39.2904&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
var currentTemp;
//Variables to hold the html elements that display the data from the api call
var oneDayCard = document.getElementById('one-day');

fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(da) {
        genOneDay(da);
        console.log(da);
    });

function genOneDay(data) {
    var cardHead = document.createElement('h2');
    var tempP = document.createElement('p');
    var humP = document.createElement('p');
    var windP = document.createElement('p');
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var icon = document.createElement('img');
    icon.src = iconUrl;
    cardHead.innerHTML = 'Baltimore: ' + moment().format('M/D/YYYY');
    tempP.innerHTML = 'Temperature: ' + data.current.temp;
    humP.innerHTML = 'Humidity: ' + data.current.humidity;
    windP.innerHTML = 'Wind Speed: ' + data.current.wind_speed;
    oneDayCard.appendChild(cardHead);
    oneDayCard.appendChild(icon);
    oneDayCard.appendChild(tempP);
    oneDayCard.appendChild(humP);
    oneDayCard.appendChild(windP);
}

function genFiveDay(data) {
    for (let i = 0; i < 5; i++) {

    }
}