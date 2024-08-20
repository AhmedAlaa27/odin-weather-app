async function getWeather(location) {
    try {
        const apiKey = 'H8QAA8U6TST69UBMGXELG5XYK';
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
        const response = await fetch(apiUrl);
        const weatherData = await response.json();
        console.log(`Address: ${weatherData.resolvedAddress}`);
        console.log(`Conditions: ${weatherData.currentConditions.conditions}`);
        console.log(`Humidity: ${weatherData.currentConditions.humidity}`);
        const F = weatherData.currentConditions.temp;
        const C = (F - 32) / 1.8;
        console.log(`Temp: ${F} °F`);
        console.log(`Temp: ${C.toFixed(2)} °C`);
    } catch(err) {
        console.log('Error while fetching');
        console.log(err);
    }
}

getWeather('cairo');