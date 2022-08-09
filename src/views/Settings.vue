<template>
  <div class="Settings">
    <ul class="Settings__cities">
      <li class="Settings__city" v-for="(city, index) in cities" :key="city.id">
        <i><img src="@/assets/images/hamburger.svg" alt="" width="24" height="24"></i>
        <span>{{ city.name }}, {{ city.sys.country }}</span>
        <button @click="cities.splice(index, 1)">
          <img src="@/assets/images/trash.svg" alt="" width="20" height="20">
        </button>
      </li>
    </ul>
    <form
      class="Settings__form"
      @submit.prevent="onSavedCity"
    >
      <label for="newCityInput">
        <span>Add location</span>
        <input type="text" id="newCityInput" v-model="newCityName">
        <button>
          <img src="@/assets/images/arrow.svg" width="24" height="24" alt="">
        </button>
      </label>
    </form>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  props: ['cities'],
  data: () => ({
    newCityName: '',
  }),
  methods: {
    onSavedCity() {
      this.cities.push({ id: this.cities.length, name: this.newCityName });
      this.newCityName = '';
    },
  },
})
export default class Settings extends Vue {
}
</script>

<style lang="scss" scoped>
.Settings {
  .Settings__form {
    margin-top: 28px;

    label {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;
      grid-auto-flow: column;
      grid-row-gap: 4px;
      grid-column-gap: 8px;

      span {
        font-size: 14px;
        font-weight: 500;
      }

      button {
        border: none;
        background-color: transparent;
        border-radius: 0;
        grid-column-start: 2;
        grid-row-start: 2;
        cursor: pointer;
      }
    }
  }

  .Settings__cities {
    list-style: none;
    display: flex;
    flex-direction: column;
    grid-row-gap: 8px;

    .Settings__city {
      width: 100%;
      display: grid;
      grid-template-columns: auto 1fr auto;
      grid-column-gap: 4px;
      align-items: center;
      background-color: #eeeeee;
      padding: 4px;

      i {
        img {
          vertical-align: middle;
        }
      }

      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }
}
</style>
