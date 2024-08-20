async function getWeather(location) {
    try {
        const apiKey = 'H8QAA8U6TST69UBMGXELG5XYK';
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
        
        const response = await fetch(apiUrl);
        const weatherData = await response.json();

        console.log(`Address: ${weatherData.resolvedAddress}`);
        console.log(`Conditions: ${weatherData.currentConditions.conditions}`);
        const F = weatherData.currentConditions.temp;
        const C = (F - 32) / 1.8;
        console.log(`Temp: ${F} °F`);
        console.log(`Temp: ${C.toFixed(2)} °C`);

        const data = {
            icon: weatherData.currentConditions.icon,
            address: weatherData.resolvedAddress,
            condition: weatherData.currentConditions.conditions,
            temp: C.toFixed(2)
        };
        displayWeather(data);

    } catch(err) {
        console.log('Error while fetching');
        console.log(err);
    }
}

function displayWeather(data) {
    const image = document.createElement('img');
    const imageSource = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/0MtwshXdNAOeP7O9JRribNXmSkRuJWsx/SVG/2nd%20Set%20-%20Color/${data.icon}.svg`;
    image.src = imageSource;

    const imageDiv = document.querySelector('.image');
    imageDiv.innerHTML = ``;
    imageDiv.appendChild(image);

    const address = document.createElement('div');
    const condition = document.createElement('div');
    const Temp = document.createElement('div');

    address.textContent = data.address;
    condition.textContent = data.condition;
    Temp.textContent = data.temp + ' °C';

    const infoDiv = document.querySelector('.info');
    infoDiv.innerHTML = ``;

    infoDiv.appendChild(address);
    infoDiv.appendChild(condition);
    infoDiv.appendChild(Temp);
}

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const locationInput = document.querySelector('#location');
    const location = locationInput.value;

    if (location) {
        getWeather(location);
    } else {
        console.log('Error: Empty Location');
    }
})