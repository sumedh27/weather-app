import styles from "./styles.css";
import { getWeatherInfo } from "./weather.js";
import { showGiphyGIF } from "./giphy.js";

const form = document.querySelector("form");
const cityName = document.querySelector("#city-name");
const inCelsius = document.querySelector(".temp-celsius");
const inFahrenheit = document.querySelector(".temp-fahrenheit");
const weatherAd = document.querySelector(".weather-address");
const weatherCond = document.querySelector(".weather-condition");
const imageTag = document.querySelector("img");
const container = document.querySelector(".container");
const error = document.querySelector(".error");

function loadingGIF() {
  imageTag.src = "https://i.gifer.com/ZKZg.gif";
}

function resetGIF() {
  imageTag.src =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3R1bHhreDYwb2ZyeHdxbXNhejNmdDRjcXpyOHN4N3hiYWN5ODJycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/SgNC860SwSYZcZ4Igc/giphy.gif";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loadingGIF();
  const weather = await getWeatherInfo(cityName.value);
  console.log(weather.message);

  if (weather.message === "Enter correct city") {
    resetGIF();
    container.classList = "container";
    weatherAd.textContent = ``;
    weatherCond.textContent = ``;
    inCelsius.textContent = ``;
    inFahrenheit.textContent = ``;
    error.classList = "error active";
    error.textContent = `${weather.message}`;
    return;
  }

  error.classList = "error";
  error.textContent = "";
  container.classList = "container active";
  const weatherGIF = await showGiphyGIF(weather.weatherCondition);
  imageTag.src = weatherGIF;
  weatherAd.textContent = `Weather Information for ${weather.cityAddress}`;
  weatherCond.textContent = `Current Weather: ${weather.weatherCondition}`;
  inCelsius.textContent = `Temperature in Celsius: ${weather.tempInCelsius}°C`;
  inFahrenheit.textContent = `Temperature in Fahrenheit: ${weather.tempInFahrenheit}°F`;
});
