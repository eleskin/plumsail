<template>
  <div class="App">
    <Header :isOpenedSettings="!isOpenedSettings" :setIsOpenedSettings="setIsOpenedSettings"/>
    <Weather v-if="!isOpenedSettings" :cities="cities"/>
    <Settings v-if="isOpenedSettings" :cities="cities"/>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header.vue';
import Settings from './views/Settings.vue';
import Weather from './views/Weather.vue';

@Options({
  data: () => ({
    isOpenedSettings: false,
    citiesNames: ['London', 'Moscow'],
    cities: [],
  }),
  methods: {
    setIsOpenedSettings(): void {
      this.isOpenedSettings = !this.isOpenedSettings;
    },
  },
  components: {
    Weather,
    Settings,
    Header,
  },
  created(): void {
    this.citiesNames.forEach((city: string) => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e00312a89f890731d064527d27cade0&units=metric`)
        .then(({ data }) => {
          this.cities.push({
            id: data.id,
            name: data.name,
            visibility: data.visibility,
            sys: {
              country: data.sys.country,
            },
            main: {
              temp: Math.round(data.main.temp),
              feels_like: Math.round(data.main.feels_like),
              humidity: data.main.humidity,
              pressure: data.main.pressure,
            },
            weather: {
              icon: data.weather[0].icon,
              main: data.weather[0].main,
              description: data.weather[0].description,
            },
            wind: data.wind,
          });
        });
    });
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
//noinspection CssUnknownTarget
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.App {
  max-width: 260px;
  width: 100%;
  font-family: 'Roboto', 'sans-serif';
  padding: 12px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 20px;
}
</style>
