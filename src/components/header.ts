import { defineCustomElement } from 'vue';
import Header from './Header.ce.vue';

const HeaderElement = defineCustomElement(Header);

const registerHeader = () => {
  customElements.define('ion-header', HeaderElement);
};

export default registerHeader;
