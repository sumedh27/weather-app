import styles from "./styles.css";
import {getWeatherInfo } from "./weather.js";

const form = document.querySelector("form");
const cityName = document.querySelector("#city-name");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherInfo(cityName.value);
});
