let show = document.getElementById("show");
let search = document.getElementById("search");
let cityVal = document.getElementById("city");
let clear = document.getElementById("clear");
let loading = document.getElementById("loading");

// Make sure you have your own key.
let key = "2f745fa85d563da5adb87b6cd4b81caf";

let getWeather = () => {
    let cityValue = cityVal.value.trim();
    if (cityValue.length === 0) {
        show.innerHTML = `<h3 class="error">Please enter a city name</h3>`;
        return;
    }

    // Show loading indicator
    loading.style.display = 'block';
    show.innerHTML = '';

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            // Hide loading indicator
            loading.style.display = 'none';

            if (data.cod === 200) {
                show.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <h4 class="weather">${data.weather[0].main}</h4>
                    <h4 class="desc">${data.weather[0].description}</h4>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
                    <h1>${data.main.temp} &#176;</h1>
                    <div class="temp_container">
                        <div>
                            <h4 class="title">min</h4>
                            <h4 class="temp">${data.main.temp_min}&#176;</h4>
                        </div>
                        <div>
                            <h4 class="title">max</h4>
                            <h4 class="temp">${data.main.temp_max}&#176;</h4>
                        </div>
                    </div>
                `;
            } else {
                show.innerHTML = `<h3 class="error">City not found</h3>`;
            }
        })
        .catch(() => {
            // Hide loading indicator
            loading.style.display = 'none';
            show.innerHTML = `<h3 class="error">Error fetching weather data</h3>`;
        });
};

// Clear input field and weather info
clear.addEventListener("click", () => {
    cityVal.value = '';
    show.innerHTML = '';
});

search.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);