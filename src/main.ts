import registerCity from '@/components/city';
import registerHeader from '@/components/header';
import registerSettings from '@/views/settings';
import registerWeather from '@/views/weather';
import { createApp } from 'vue';
import App from './App.ce.vue';
import './registerServiceWorker';
import registerApp from './app';
import './assets/styles/main.scss';

createApp(App).mount('#app');
registerHeader();
registerSettings();
registerWeather();
registerCity();
registerApp();
