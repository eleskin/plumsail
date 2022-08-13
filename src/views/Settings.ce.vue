<template>
  <div class="Settings">
    <span class="Settings__empty" v-if="!cities.length">Add the first location</span>
    <ul class="Settings__cities" v-if="cities.length">
      <draggable
        :list="cities"
        @start="dragging = true"
        @end="onDragEnd"
        ghost-class="Settings__cities_ghost"
        :move="checkMove"
      >
        <template #item="{ element }">
          <li class="Settings__city">
            <i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="24" width="24"><path fill="#231F20" d="M8.667 15h30a1 1 0 100-2h-30a1 1 0 100 2zM8.667 37h30a1 1 0 100-2h-30a1 1 0 100 2zM8.667 26h30a1 1 0 100-2h-30a1 1 0 100 2z"/></svg></i>
            <span>{{ element.name }}, {{ element.sys.country }}</span>
            <button @click="onRemoveCity(element.id)">
              <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="20px" height="20px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
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
          <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,6a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H7.41l1.3-1.29A1,1,0,0,0,7.29,9.29l-3,3a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,14H17a3,3,0,0,0,3-3V7A1,1,0,0,0,19,6Z"/></svg>
        </button>
      </label>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import draggable from 'vuedraggable';

interface ICity {
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
    onDragEnd() {
      this.dragging = false;
      localStorage.setItem('cities', this.cities.map((city: ICity) => city.name.toLowerCase()).join(','));
    },
  },
})
export default class Settings extends Vue {
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

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
        font-weight: 700;
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
