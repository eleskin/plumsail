<template>
  <div class="City">
    <em class="City__name">{{ city.name }}, {{ city.sys.country }}</em>
    <div class="City__temp">
      <img :src="`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`" alt="">
      <strong>{{ city.main.temp }}°C</strong>
    </div>
    <span class="City__info">{{ weatherInfo }}</span>
    <ul class="City__data">
      <li>
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"
             :style="`transform: rotate(${city.wind.deg}deg)`" width="20" height="20">
          <polygon
            style="fill:#000000;stroke:#000000;stroke-width:2;stroke-miterlimit:10;"
            points="16,7 8,26 16,23 24,26 "
          />
        </svg>
        {{ city.wind.speed }}m/s {{ windDirection }}
      </li>
      <li>
        <svg id="Capa_1"
             xmlns="http://www.w3.org/2000/svg" x="0px"
             y="0px"
             viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve"
             width="16"
             height="16">
    <g>
        <path
          style="fill:#212121;"
          d="M13.014,
          11.002c-1.107,0.008-2.008-0.884-2.016-1.987c-0.009-1.107,
          0.879-2.007,1.987-2.016
          c0.166-0.001,0.324,0.023,
          0.478,0.06c1.156-0.905,2.667-2.085,
          2.839-2.208c0.298-0.211,0.64-0.236,0.883,0.007
          c0.24,0.248,0.215,0.623-0.01,0.886c-0.077,
          0.091-1.295,1.622-2.229,2.798c0.034,0.143,0.056,0.291,0.057,
          0.444C15.012,10.088,14.122,10.994,13.014,11.002z M0,21c0-0.553,
          0.448-1,1-1h9v-2.525C6.51,16.236,4,12.91,4,9c0-4.962,4.038-9,
          9-9c4.963,0,9,4.038,9,9c0,3.91-2.51,7.236-6,8.475V20h9c0.553,
          0,1,0.447,1,1s-0.447,1-1,1H1C0.448,22,0,21.553,0,21z M13,15c3.309,
          0,6-2.691,6-6s-2.691-6-6-6S7,5.691,7,9S9.691,15,
          13,15z M25,24H1c-0.552,0-1,0.447-1,1s0.448,1,1,1h24c0.553,0,1-0.447,1-1
                S25.553,24,25,24z"></path>
    </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
</svg>
        {{ city.main.pressure }}hPa
      </li>
      <li>Humidity: {{ city.main.humidity }}%</li>
      <li>Dew point: {{ dewPoint }}°C</li>
      <li>Visibility: {{ (city.visibility / 1000).toFixed(1) }}km</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    city: Object,
  },
  computed: {
    weatherInfo(): string {
      return `
        Feels like ${this.city.main.feelsLike}°C.
        ${this.city.weather.main}.
        ${this.city.weather.description[0].toUpperCase()}${this.city.weather.description.substring(1)}
      `;
    },
    dewPoint(): number {
      return this.city.main.temp - (100 - this.city.main.humidity) / 5;
    },
    windDirection(): string {
      const { deg } = this.city.wind;

      if (deg > 348.75 && deg <= 11.25) {
        return 'N';
      }
      if (deg > 11.25 && deg <= 33.75) {
        return 'NNE';
      }
      if (deg > 33.75 && deg <= 56.25) {
        return 'NE';
      }
      if (deg > 56.25 && deg <= 78.75) {
        return 'ENE';
      }
      if (deg > 78.75 && deg <= 101.25) {
        return 'E';
      }
      if (deg > 101.25 && deg <= 123.75) {
        return 'ESE';
      }
      if (deg > 123.75 && deg <= 146.25) {
        return 'SE';
      }
      if (deg > 146.25 && deg <= 168.75) {
        return 'SSE';
      }
      if (deg > 168.75 && deg <= 191.25) {
        return 'S';
      }
      if (deg > 191.25 && deg <= 213.75) {
        return 'SSW';
      }
      if (deg > 213.75 && deg <= 236.25) {
        return 'SW';
      }
      if (deg > 236.25 && deg <= 258.75) {
        return 'WSW';
      }
      if (deg > 258.75 && deg <= 281.25) {
        return 'W';
      }
      if (deg > 281.25 && deg <= 303.75) {
        return 'WNW';
      }
      if (deg > 303.75 && deg <= 326.25) {
        return 'NW';
      }
      return 'NNW';
    },
  },
})
export default class City extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.City {
  display: flex;
  flex-direction: column;
  grid-row-gap: 16px;

  .City__name {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }

  .City__temp {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-column-gap: 16px;

    strong {
      font-size: 28px;
    }
  }

  .City__info {
    font-size: 14px;
  }

  .City__data {
    list-style: none;
    font-size: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;

    li {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      grid-column-gap: 4px;
    }

    li:last-child {
      grid-column: 1 / 3;
    }
  }
}
</style>
