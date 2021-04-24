//String to hold current city and the API calls
let city = 'Baltimore';
let numCities = 1;
let fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
let currentDayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";

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

//Initial API call for the current day 
fetch(currentDayApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(da) {
        genOneDay(da);
    });

//Initial API call for the five day forecast
fetch(fiveDayApi)
    .then(function(response) {
        return response.json();
    })
    .then(function(da) {
        genFiveDay(da);
    });

//Function to get data
function callAPIs() {
    //API call for the current day
    fetch(currentDayApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(da) {
            //Clear previous data from the card
            while (currentCard.firstChild) {
                currentCard.removeChild(currentCard.firstChild);
            }
            genOneDay(da);
        });

    //API call for the five day forecast
    fetch(fiveDayApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(da) {
            //Clear previous data from the cards
            while (dayOne.firstChild) {
                dayOne.removeChild(dayOne.firstChild);
            }
            while (dayTwo.firstChild) {
                dayTwo.removeChild(dayTwo.firstChild);
            }
            while (dayThree.firstChild) {
                dayThree.removeChild(dayThree.firstChild);
            }
            while (dayFour.firstChild) {
                dayFour.removeChild(dayFour.firstChild);
            }
            while (dayFive.firstChild) {
                dayFive.removeChild(dayFive.firstChild);
            }
            genFiveDay(da);
        });
}


//Generate the current day html elements and add them to the page
function genOneDay(data) {
    let cardHead = document.createElement('h2');
    let tempP = document.createElement('p');
    let humP = document.createElement('p');
    let windP = document.createElement('p');
    let iconCode = data.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    let icon = document.createElement('img');
    icon.src = iconUrl;
    cardHead.innerHTML = city + ': ' + moment().format('M/D/YYYY');
    tempP.innerHTML = 'Temperature: ' + data.main.temp;
    humP.innerHTML = 'Humidity: ' + data.main.humidity;
    windP.innerHTML = 'Wind Speed: ' + data.wind.speed;
    currentCard.appendChild(cardHead);
    currentCard.appendChild(icon);
    currentCard.appendChild(tempP);
    currentCard.appendChild(humP);
    currentCard.appendChild(windP);
}

//Generate the five day html elements and add them to the page
function genFiveDay(data) {
    //Since the data is in 3 hour blocks, I need to select just one for every day
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

//Saves the typed in city to local storage
function saveCity() {
    numCities++;
    window.localStorage.setItem("city" + numCities, searchInput.value);
    city = searchInput.value;
    let newCityDiv = document.createElement('div');
    let historyLink = document.createElement('a');
    historyLink.innerHTML = city;
    historyLink.onclick = function() { //Add small function that changes to city selected from search history
        city = historyLink.innerHTML;
        city.replace(/\s+/g, '');
        fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
        currentDayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
        callAPIs();
    }
    newCityDiv.appendChild(historyLink);
    searchHistory.appendChild(newCityDiv);
    city.replace(/\s+/g, '');
    fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
    currentDayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";
    callAPIs();
}