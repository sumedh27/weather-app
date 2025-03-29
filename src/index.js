import styles from "./styles.css";

const WEATHER_KEY = "ZJ2WBD9CSJNNB8A5MUD27QPK6";

function getCityName() {
  const cityName = prompt(`Enter City Name`);
  return cityName.toLowerCase();
}

async function getWeatherJson() {
  const cityName = getCityName();
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=${WEATHER_KEY}&contentType=json`;

  const response = await fetch(url, { mode: "cors" });
  const weatherJson = await response.json();
  return weatherJson;
}

async function getWeatherInfo() {
  const cityJson = await getWeatherJson();
  const cityAddress = cityJson.resolvedAddress;
  const tempInFahrenheit = cityJson.currentConditions.temp;
  const tempInCelsius = convertToCelsius(tempInFahrenheit);

  return { cityAddress, tempInCelsius, tempInFahrenheit };
}

function convertToCelsius(temp) {
  const celsiusTemp = temp;
  let fahrenheitTemp = 0;

  fahrenheitTemp = ((celsiusTemp - 32) * 5) / 9;

  return Math.round(fahrenheitTemp);
}

// getWeatherInfo();
console.log(getWeatherInfo());
