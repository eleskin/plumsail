import { defineCustomElement } from 'vue';
import Weather from './Weather.ce.vue';

const WeatherElement = defineCustomElement(Weather);

const registerWeather = () => {
  customElements.define('ion-weather', WeatherElement);
};

export default registerWeather;
