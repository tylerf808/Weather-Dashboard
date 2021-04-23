let city = 'Baltimore';
let fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
let currentDayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
let currentTemp;
//Variables to hold the html elements that display the data from the api call
let currentCard = document.getElementById('current-day');
let dayOne = document.getElementById('day-one');
let dayTwo = document.getElementById('day-two');
let dayThree = document.getElementById('day-three');
let dayFour = document.getElementById('day-four');
let dayFive = document.getElementById('day-five');
let searchHistory = document.getElementById('cities');
let searchInput = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');

fetch(currentDayApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(da) {
        //genOneDay(da);
        console.log('current: ', da);
    });

fetch(fiveDayApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(da) {
        //genFiveDay(da);
        console.log('five day: ', da);
    });

function genOneDay(data) {
    let cardHead = document.createElement('h2');
    let tempP = document.createElement('p');
    let humP = document.createElement('p');
    let windP = document.createElement('p');
    let uv = document.createElement('p');
    uv.innerHTML = 'UV Index: ' + data.current.uvi;
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
    currentCard.appendChild(uv);
}

function genFiveDay(data) {
    for (let i = 1; i <= 40; i++) {
        if (i % 8 == 0 || i == 1) {
            let header = document.createElement('h2');
            let icon = document.createElement('img');
            let temp = document.createElement('p');
            let humidity = document.createElement('p');
            temp.innerHTML = 'Temp: ' + data.list[i - 1].main.temp;
            humidity.innerHTML = 'Humidity: ' + data.list[i - 1].main.humidity;
            icon.src = "http://openweathermap.org/img/w/" + data.list[i - 1].weather[0].icon + ".png";
            header.innerHTML = moment.unix(data.list[i - 1].dt).format('M/D/YYYY');
            switch (i) {
                case 1:
                    dayOne.appendChild(header);
                    dayOne.appendChild(icon);
                    dayOne.appendChild(temp);
                    dayOne.appendChild(humidity);
                    break;
                case 8:
                    dayTwo.appendChild(header);
                    dayTwo.appendChild(icon);
                    dayTwo.appendChild(temp);
                    dayTwo.appendChild(humidity);
                    break;
                case 16:
                    dayThree.appendChild(header);
                    dayThree.appendChild(icon);
                    dayThree.appendChild(temp);
                    dayThree.appendChild(humidity);
                    break;
                case 24:
                    dayFour.appendChild(header);
                    dayFour.appendChild(icon);
                    dayFour.appendChild(temp);
                    dayFour.appendChild(humidity);
                    break;
                case 32:
                    dayFive.appendChild(header);
                    dayFive.appendChild(icon);
                    dayFive.appendChild(temp);
                    dayFive.appendChild(humidity);
                    break;
                default:

            }
        }
    }
}

function saveCity() {
    let input = searchInput.value;

}

searchBtn.onclick = saveCity;