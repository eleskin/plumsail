<template>
  <div class="Weather">
    <ul class="Weather__cities">
      <li class="Weather__city" v-for="city in cities" :key="city.id">
        <City :city="city"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import City from '@/components/City.vue';

@Options({
  components: {
    City,
  },
  props: ['cities'],
  updated() {
    // console.log(this.cities);
  },
})
export default class Weather extends Vue {
}
</script>

<style lang="scss" scoped>
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
