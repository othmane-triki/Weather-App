// Weather App JavaScript Code

const weatherFrom = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey  = "1ecf385fb2f72f4f84c28edba5f2e2d8";

;

weatherFrom.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeather(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError('An error occurred while fetching the weather data');
            return;
        }
    }
    else {
        displayError('Please enter a city name');
        return;
    }
});

async function getWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    console.log(response);

    if (!response.ok) {
        const message = response.status === 401
            ? 'Invalid API key'
            : 'City not found or another error occurred';
        throw new Error(message);
    }


    return await response.json();
}

function displayWeatherInfo(data){

    console.log(data);
    const {name: city,
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;

    card.textContent = '';
    card.style.display = 'flex';

    const cityName = document.createElement('h1');
    cityName.textContent = city;
    cityName.classList.add('citydisplay');
    card.appendChild(cityName);

    const temperature = document.createElement('p');
    temperature.textContent = `${temp}°C`;
    temperature.classList.add('tempDisplay');
    card.appendChild(temperature);

    const humidityDisplay = document.createElement('p');
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add('humidityDisplay');
    card.appendChild(humidityDisplay);

    const descriptionDisplay = document.createElement('p');
    descriptionDisplay.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    descriptionDisplay.classList.add('descDisplay');
    card.appendChild(descriptionDisplay);   

    const weatherEmoji = document.createElement('p');
    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add('weatherEmoji');
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatheEmoji) {
    switch (true) {
        case weatheEmoji >= 200 && weatheEmoji < 300:
            return '⛈️'; // Thunderstorm
        case weatheEmoji >= 300 && weatheEmoji < 400:
            return '🌧️'; // Drizzle
        case weatheEmoji >= 500 && weatheEmoji < 600:
            return '🌧️'; // Rain
        case weatheEmoji >= 600 && weatheEmoji < 700:
            return '❄️'; // Snow
        case weatheEmoji >= 700 && weatheEmoji < 800:
            return '🌫️'; // Atmosphere
        case weatheEmoji === 800:
            return '☀️'; // Clear
        case weatheEmoji > 800:
            return '☁️'; // Clouds
        default:
            return '';
    }
}

function displayError(error) {
    const errorDisplay = document.createElement('p');
    errorDisplay.classList.add('errorDisplay');
    
    card.textContent = '';
    card.style.display = 'flex';
    errorDisplay.textContent = error;
    card.appendChild(errorDisplay);
}