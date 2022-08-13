<template>
  <div class="App">
    <Header :isOpenedSettings="!isOpenedSettings" :setIsOpenedSettings="setIsOpenedSettings"/>
    <Weather v-if="!isOpenedSettings" :cities="cities"/>
    <Settings v-if="isOpenedSettings" :cities="cities" :addNewCity="addNewCity"/>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header.vue';
import Settings from './views/Settings.vue';
import Weather from './views/Weather.vue';

export interface ICity {
  id: number;
  name: string;
  visibility: number;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    icon: string;
    main: string;
    description: string;
  };
  wind: string;
}

interface ICityData {
  id: number;
  name: string;
  visibility: number;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    // eslint-disable-next-line camelcase
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    icon: string;
    main: string;
    description: string;
  }[];
  wind: string;
}

@Options({
  data: () => ({
    isOpenedSettings: false,
    cities: [],
  }),
  methods: {
    setIsOpenedSettings(): void {
      this.isOpenedSettings = !this.isOpenedSettings;
    },
    pushCities(cities: ICity[]) {
      this.cities = cities;
    },
    getCity(cityName: string, callback: (value: AxiosResponse) => unknown): Promise<unknown> {
      return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3e00312a89f890731d064527d27cade0&units=metric`)
        .then(callback);
    },
    addNewCity(cityName: string): void {
      this.getCity(cityName, ({ data }: { data: ICityData }) => {
        const name: string = data.name.toLowerCase();
        const cities: string[] = localStorage.getItem('cities')?.split(',') || [];

        if (cities.indexOf(name) === -1) {
          this.cities.push({
            id: data.id,
            name: data.name,
            visibility: data.visibility,
            sys: {
              country: data.sys.country,
            },
            main: {
              temp: Math.round(data.main.temp),
              feelsLike: Math.round(data.main.feels_like),
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
          cities.push(name);
          localStorage.setItem('cities', cities.join(','));
        }
      });
    },
    initializeCities(cities: string[]): Promise<ICity[]> {
      return Promise.all<ICity>(
        cities.map((city: string): Promise<ICity> => this.getCity(
          city,
          ({ data }: { data: ICityData }) => ({
            id: data.id,
            name: data.name,
            visibility: data.visibility,
            sys: {
              country: data.sys.country,
            },
            main: {
              temp: Math.round(data.main.temp),
              feelsLike: Math.round(data.main.feels_like),
              humidity: data.main.humidity,
              pressure: data.main.pressure,
            },
            weather: {
              icon: data.weather[0].icon,
              main: data.weather[0].main,
              description: data.weather[0].description,
            },
            wind: data.wind,
          }),
        )),
      );
    },
  },
  components: {
    Weather,
    Settings,
    Header,
  },
  created(): void {
    if (localStorage.getItem('cities')) {
      const cities: string[] = localStorage.getItem('cities')?.split(',') || [];
      this.initializeCities(cities).then(this.pushCities);
    } else {
      this.isOpenedSettings = true;
    }
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
