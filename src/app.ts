import { defineCustomElement } from 'vue';
import App from './App.ce.vue';

const AppElement = defineCustomElement(App);

const registerApp = () => {
  customElements.define('weather-widget', AppElement);
};

export default registerApp;
