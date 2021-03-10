<template>
  <div class="ui-canvas">
    <ui-page-home v-if="page === 'home'"></ui-page-home>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiPageHome } from '../pages'

export default defineComponent({
  name: 'ui-canvas',
  components: {
    UiPageHome,
  },
  setup() {
    let page: string = 'home'
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
