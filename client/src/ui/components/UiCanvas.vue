<template>
  <div class="ui-canvas">
    <ui-page-home v-if="page === 'home'"></ui-page-home>
    <ui-page-lobby v-if="page === 'lobby'"></ui-page-lobby>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, provide, ref, watch } from 'vue'
import { UiPageHome, UiPageLobby } from '../pages'

export default defineComponent({
  name: 'ui-canvas',
  components: {
    UiPageHome,
    UiPageLobby,
  },
  setup() {
    // pages case: home, lobby, game, game-over
    const page = ref('home')
    const toPage = (value) => {
      page.value = value
    }
    provide('toPage', toPage)

    const startGame = inject('startGame', () => {})

    watch(page, () => {
      if (page.value == 'game') {
        console.log('to game page')
        startGame()
      }
    })

    return { page }
  },
})
</script>

<style lang="sass" scoped>
.ui-canvas
  position: relative
  width: 100vw
  height: 100vh
  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
</style>
