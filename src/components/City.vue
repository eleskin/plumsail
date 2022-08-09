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
        <img
          src="@/assets/images/arrow-direction.svg"
          alt=""
          width="20"
          height="20"
          :style="`transform: rotate(${city.wind.deg}deg)`"
        >
        {{ city.wind.speed }}m/s {{ windDirection }}
      </li>
      <li>
        <img
          src="@/assets/images/pressure.svg"
          alt=""
          width="16"
          height="16"
        >
        {{ city.main.pressure }}hPa
      </li>
      <li>Humidity: {{ city.main.humidity }}%</li>
      <li>Dew point: {{ dewPoint }}°C</li>
      <li>Visibility: {{ (city.visibility / 1000).toFixed(1) }}km</li>
    </ul>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  props: ['city'],
  computed: {
    weatherInfo() {
      return `
        Feels like ${this.city.main.feels_like}°C.
        ${this.city.weather.main}.
        ${this.city.weather.description[0].toUpperCase()}${this.city.weather.description.substring(1)}
      `;
    },
    dewPoint() {
      return this.city.main.temp - (100 - this.city.main.humidity) / 5;
    },
    windDirection() {
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
