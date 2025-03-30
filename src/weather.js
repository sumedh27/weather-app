const WEATHER_KEY = "ZJ2WBD9CSJNNB8A5MUD27QPK6";

async function getWeatherJson(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${WEATHER_KEY}&contentType=json`;

  const response = await fetch(url, { mode: "cors" });
  const weatherJson = await response.json();
  return weatherJson;
}

async function getWeatherInfo(cityName) {
  const city = cityName.toLowerCase();
  console.log(`Searching for ${city}`)
  const cityJson = await getWeatherJson(city);
  const cityAddress = cityJson.resolvedAddress;
  const tempInFahrenheit = cityJson.currentConditions.temp;
  const tempInCelsius = convertToCelsius(tempInFahrenheit);

  console.log(cityAddress, tempInCelsius, tempInFahrenheit);
  return { cityAddress, tempInCelsius, tempInFahrenheit };
}

function convertToCelsius(temp) {
  const celsiusTemp = temp;
  let fahrenheitTemp = 0;

  fahrenheitTemp = ((celsiusTemp - 32) * 5) / 9;

  return Math.round(fahrenheitTemp);
}

export { getWeatherInfo };
