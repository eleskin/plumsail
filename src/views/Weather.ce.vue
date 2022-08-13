<template>
  <div class="Weather">
    <ul class="Weather__cities">
      <li class="Weather__city" v-for="city in cities" :key="city.id">
        <ion-city .city="city"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    cities: Array,
  },
})
export default class Weather extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.Weather {
  margin-top: -40px;

  .Weather__cities {
    list-style: none;
    display: flex;
    flex-direction: column;
    grid-row-gap: 48px;
  }
}
</style>
