import { defineCustomElement } from 'vue';
import City from './City.ce.vue';

const CityElement = defineCustomElement(City);

const registerCity = () => {
  customElements.define('ion-city', CityElement);
};

export default registerCity;
