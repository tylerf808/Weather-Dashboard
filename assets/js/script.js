var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Baltimore&units=imperial&appid=63c6b2efa092c7a6d9d2e7f1b655bc65";

fetch(apiUrl)
    .then(response => response.json())
    .then(da => console.log(da));