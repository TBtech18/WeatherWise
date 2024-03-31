document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const search = document.querySelector(".search-box button");
    const searchInput = document.querySelector(".search-box input");
    const weatherbox = document.querySelector(".weather-box");
    const weatherdetails = document.querySelector(".weather-details");
    const error404 = document.querySelector(".not-found");

    const fetchWeatherData = () => {
        const APIkey = "0fb7f3cd8e28dd71cb0a25a2ba3d31c2";
        const city = searchInput.value.trim();
        if (city === "") return;
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((json) => {
                console.log("Response JSON:", json);
                if (json.cod && json.cod === "404") {
                    console.log("City not found");
                    displayError();
                    return;
                }
                if (json.message) {
                    console.error("API Error:", json.message);
                    displayError();
                    return;
                }
                displayWeatherData(json);
                changeBackground(json);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                displayError();
            });
    };

    const displayWeatherData = (json) => {
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");
        const weatherIcon = document.querySelector(".weather-box img");

        temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

        // Dynamically change the weather icon based on weather condition
        switch (json.weather[0].main) {
            case "Clear":
                weatherIcon.src = 'clear.png';
                break;
            case "Rain":
                weatherIcon.src = 'rain.png';
                break;
            case "Snow":
                weatherIcon.src = 'snow.png';
                break;
            case "Clouds":
                weatherIcon.src = 'cloud.png';
                break;
            case "Mist":
            case "Haze":
                weatherIcon.src = 'mist.png';
                break;
            default:
                weatherIcon.src = 'clear.png';
        }

        container.style.height = "500px";
        weatherbox.classList.add("active");
        weatherdetails.classList.add("active");
        error404.classList.remove("active");
    };

    const displayError = () => {
        container.style.height = "400px";
        weatherbox.classList.remove("active");
        weatherdetails.classList.remove("active");
        error404.classList.add("active");
    };

    const changeBackground = (json) => {
        const body = document.querySelector("body");
        switch (json.weather[0].main) {
            case "Clear":
                body.style.backgroundImage = 'url("tree-2916763_1920.jpg")';
                break;
            case "Rain":
                body.style.backgroundImage = 'url("rain-stoppers-1461288_1920.jpg")';
                break;
            case "Snow":
                body.style.backgroundImage = 'url("trees-1861704_1920.jpg")';
                break;
            case "Clouds":
                body.style.backgroundImage = 'url("pexels-pixabay-158163.jpg")';
                break;
            case "Mist":
            case "Haze":
                body.style.backgroundImage = 'url("pexels-karol-wiśniewski-845619.jpg")';
                break;
            default:
                body.style.backgroundImage = 'url("shore-914149_1920.jpg")';
        }
    };

    search.addEventListener("click", fetchWeatherData);

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            fetchWeatherData();
        }
    });
});
