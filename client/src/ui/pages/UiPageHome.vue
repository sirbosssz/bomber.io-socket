<template>
  <div class="ui-page-home fullscreen f-center">
    <div class="container">
      <ui-title>The Bombermann</ui-title>
      <h2>What's your player name?</h2>
      insert here
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiTitle } from '../components'

export default defineComponent({
  name: 'ui-page-home',
  components: {
    UiTitle,
  },
})
</script>

<style lang="sass" scoped>
@import '../style'
.ui-page-home
  background-color: $background
  color: $font

.container
  text-align: center
</style>
