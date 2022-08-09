<template>
  <header class="Header">
    <h2 :class="`Header__title ${isOpenedSettings ? 'Header__title_hidden' : ''}`">Settings</h2>
    <button class="Header__button" @click="setIsOpenedSettings">
      <img src="@/assets/images/gear.svg" width="20" height="20" alt="" v-if="isOpenedSettings">
      <img src="@/assets/images/close.svg" width="20" height="20" alt="" v-if="!isOpenedSettings">
    </button>
  </header>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
  props: ['isOpenedSettings', 'setIsOpenedSettings'],
})
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
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
