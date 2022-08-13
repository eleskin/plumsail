import { defineCustomElement } from 'vue';
import Settings from './Settings.ce.vue';

const SettingsElement = defineCustomElement(Settings);

const registerSettings = () => {
  customElements.define('ion-settings', SettingsElement);
};

export default registerSettings;
