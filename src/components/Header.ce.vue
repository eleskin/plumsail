<template>
  <header class="Header">
    <h2 :class="`Header__title ${isOpenedSettings ? 'Header__title_hidden' : ''}`">Settings</h2>
    <button class="Header__button" @click="setIsOpenedSettings">
      <svg
        xmlns="http://www.w3.org/2000/svg" width="20" height="20"
           viewBox="0 0 16 16" v-if="isOpenedSettings">
        <!--suppress CheckTagEmptyBody -->
        <path fill="#444444"
              d="M15.2 6l-1.1-0.2c-0.1-0.2-0.1-0.4-0.2-0.6l0.6-0.9
              0.5-0.7-2.6-2.6-0.7 0.5-0.9
              0.6c-0.2-0.1-0.4-0.1-0.6-0.2l-0.2-1.1-0.2-0.8h-3.6l-0.2
              0.8-0.2 1.1c-0.2 0.1-0.4 0.1-0.6 0.2l-0.9-0.6-0.7-0.4-2.5
              2.5 0.5 0.7 0.6 0.9c-0.2 0.2-0.2 0.4-0.3 0.6l-1.1 0.2-0.8
              0.2v3.6l0.8 0.2 1.1 0.2c0.1 0.2 0.1 0.4 0.2 0.6l-0.6
              0.9-0.5 0.7 2.6 2.6 0.7-0.5 0.9-0.6c0.2 0.1 0.4 0.1
              0.6 0.2l0.2 1.1 0.2 0.8h3.6l0.2-0.8 0.2-1.1c0.2-0.1
              0.4-0.1 0.6-0.2l0.9 0.6 0.7 0.5 2.6-2.6-0.5-0.7-0.6-0.9c0.1-0.2
              0.2-0.4 0.2-0.6l1.1-0.2 0.8-0.2v-3.6l-0.8-0.2zM15 9l-1.7 0.3c-0.1
              0.5-0.3 1-0.6 1.5l0.9 1.4-1.4 1.4-1.4-0.9c-0.5 0.3-1 0.5-1.5 0.6l-0.3
              1.7h-2l-0.3-1.7c-0.5-0.1-1-0.3-1.5-0.6l-1.4 0.9-1.4-1.4
              0.9-1.4c-0.3-0.5-0.5-1-0.6-1.5l-1.7-0.3v-2l1.7-0.3c0.1-0.5
              0.3-1 0.6-1.5l-1-1.4 1.4-1.4 1.4 0.9c0.5-0.3 1-0.5
              1.5-0.6l0.4-1.7h2l0.3 1.7c0.5 0.1 1 0.3 1.5 0.6l1.4-0.9 1.4
              1.4-0.9 1.4c0.3 0.5 0.5 1 0.6 1.5l1.7 0.3v2z"></path>
        <!--suppress CheckTagEmptyBody -->
        <path fill="#444444"
              d="M8 4.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5
              3.5 3.5 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5zM8
              10.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1
              2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z"></path>
      </svg>
      <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px" v-if="!isOpenedSettings"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
    </button>
  </header>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    isOpenedSettings: Boolean,
    setIsOpenedSettings: Function,
  },
})
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";

.Header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;

  .Header__title {
    font-size: 14px;
    margin: 0;
    padding: 0;
    font-weight: 500;

    &_hidden {
      visibility: hidden;
    }
  }

  .Header__button {
    padding: 0;
    margin: 0;
    border: none;
    border-radius: 0;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
