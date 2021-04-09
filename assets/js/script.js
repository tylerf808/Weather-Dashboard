let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lon=-76.6122&lat=39.2904&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
let currentTemp;
//Variables to hold the html elements that display the data from the api call
let currentCard = document.getElementById('current-day');
let dayOne = document.getElementById('day-one');
let dayTwo = document.getElementById('day-two');
let dayThree = document.getElementById('day-three');
let dayFour = document.getElementById('day-four');
let dayFive = document.getElementById('day-five');

fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(da) {
        genOneDay(da);
        genFiveDay(da);
        console.log(da);
    });

function genOneDay(data) {
    let cardHead = document.createElement('h2');
    let tempP = document.createElement('p');
    let humP = document.createElement('p');
    let windP = document.createElement('p');
    let iconCode = data.current.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    let icon = document.createElement('img');
    icon.src = iconUrl;
    cardHead.innerHTML = 'Baltimore: ' + moment().format('M/D/YYYY');
    tempP.innerHTML = 'Temperature: ' + data.current.temp;
    humP.innerHTML = 'Humidity: ' + data.current.humidity;
    windP.innerHTML = 'Wind Speed: ' + data.current.wind_speed;
    currentCard.appendChild(cardHead);
    currentCard.appendChild(icon);
    currentCard.appendChild(tempP);
    currentCard.appendChild(humP);
    currentCard.appendChild(windP);
}

function genFiveDay(data) {
    for (let i = 0; i < 5; i++) {
        let header = document.createElement('h2');
        header.innerHTML = data.daily[i].temp.day;
        switch (i) {
            case 0:
                dayOne.appendChild(header);
                break;
            case 1:
                dayTwo.appendChild(header);
                break;
            case 2:
                dayThree.appendChild(header);
                break;
            case 3:
                dayFour.appendChild(header);
                break;
            default:
                dayFive.appendChild(header);
        }
    }
}