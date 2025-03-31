const WEATHER_KEY = "ZJ2WBD9CSJNNB8A5MUD27QPK6";

async function getWeatherJson(city) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${WEATHER_KEY}&contentType=json`;
  try {
    const response = await fetch(url, { mode: "cors" });
    console.log(response);
    if (!response.ok) {
      throw new Error("City Invalid");
    } else {
      const weatherJson = await response.json();
      return weatherJson;
    }
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

async function getWeatherInfo(cityName) {
  const city = cityName.toLowerCase();
  console.log(`Searching for ${city}`);
  try {
    let cityJson = await getWeatherJson(city);
    console.log(cityJson);
    if (cityJson.message === "City Invalid") {
      throw new Error("Enter correct city");
    }
    const cityAddress = cityJson.resolvedAddress;
    const tempInFahrenheit = Math.round(cityJson.currentConditions.temp);
    const tempInCelsius = convertToCelsius(tempInFahrenheit);
    const weatherCondition = cityJson.currentConditions.conditions;
    return { cityAddress, tempInCelsius, tempInFahrenheit, weatherCondition };
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

function convertToCelsius(temp) {
  const celsiusTemp = temp;
  let fahrenheitTemp = 0;
  fahrenheitTemp = ((celsiusTemp - 32) * 5) / 9;

  return Math.round(fahrenheitTemp);
}

function handleError() {}

export { getWeatherInfo };
