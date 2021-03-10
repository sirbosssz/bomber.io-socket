<template>
  <div id="ui-base">
    <ui-canvas></ui-canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UiCanvas } from './components'
import 'phaser'
import { config } from '../game/index'

export default defineComponent({
  components: {
    UiCanvas,
  },
  setup() {
    const text: string = 'Hello World'
    let start: boolean = false
    let game: Phaser.Game = undefined

    if (start) {
      game = new Phaser.Game(config)

      // get current scene
      game.events.on('changescene', (scene: Phaser.Scene) => {
        console.log(scene)
      })
    }
    return { text, game }
  },
})
</script>

<style lang="sass" scoped>
#ui-base
  position: absolute
  top: 0
  left: 0
</style>
