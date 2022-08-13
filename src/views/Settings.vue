<template>
  <div class="Settings">
    <span class="Settings__empty" v-if="!cities.length">Add the first location</span>
    <ul class="Settings__cities" v-if="cities.length">
      <draggable
        :list="cities"
        @start="dragging = true"
        @end="dragging = false"
        ghost-class="Settings__cities_ghost"
      >
        <template #item="{ element }">
          <li class="Settings__city">
            <i><img src="@/assets/images/hamburger.svg" alt="" width="24" height="24"></i>
            <span>{{ element.name }}, {{ element.sys.country }}</span>
            <button @click="onRemoveCity(element.id)">
              <img src="@/assets/images/trash.svg" alt="" width="20" height="20">
            </button>
          </li>
        </template>
      </draggable>
    </ul>
    <form
      class="Settings__form"
      @submit.prevent="onSaveCity"
    >
      <label for="newCityInput">
        <span>Add location</span>
        <input
          type="text"
          id="newCityInput"
          v-model="newCityName"
          placeholder="Enter a city name or identifier"
        >
        <button>
          <img src="@/assets/images/arrow.svg" width="24" height="24" alt="">
        </button>
      </label>
    </form>
  </div>
</template>

<script lang="ts">
import { ICity } from '@/App.vue';
import { Options, Vue } from 'vue-class-component';
import draggable from 'vuedraggable';

@Options({
  props: {
    cities: Array,
    addNewCity: Function,
  },
  components: {
    draggable,
  },
  data: () => ({
    newCityName: '',
    dragging: false,
  }),
  methods: {
    onSaveCity(): void {
      this.addNewCity(this.newCityName.toLowerCase());
      this.newCityName = '';
    },
    onRemoveCity(id: number): void {
      const cities: string[] = localStorage.getItem('cities')?.split(',') || [];
      let cityIndex = -1;
      this.cities.forEach((city: ICity, index: number) => {
        if (city.id === id) {
          cityIndex = index;
        }
      });

      cities.splice(cities.indexOf(this.cities[cityIndex].name.toLowerCase()), 1);
      localStorage.setItem('cities', cities.join(',') || '');
      this.cities.splice(cityIndex, 1);
    },
  },
})
export default class Settings extends Vue {
}
</script>

<style lang="scss" scoped>
.Settings {
  .Settings__empty {
    font-size: 14px;
    text-align: center;
    display: block;
    margin-top: 16px;
    color: rgba(0, 0, 0, 0.5);
  }

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

  .Settings__cities_ghost {
    opacity: 0.5;
    background-color: #c8ebfb;
  }
}
</style>
