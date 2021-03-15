<template>
  <div id="ui-base">
    <ui-canvas></ui-canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, readonly, ref, Ref, watch } from 'vue'
import { UiCanvas } from './components'
import 'phaser'
import { config } from '../game/index'
import socket from '../socket'

export default defineComponent({
  components: {
    UiCanvas,
  },
  setup() {
    let game: Phaser.Game = undefined

    const start: Ref<boolean> = ref(false)
    const startGame = () => {
      start.value = true
    }
    const stopGame = () => {
      start.value = false
    }
    provide('gameState', readonly(start))
    provide('startGame', startGame)
    provide('stopGame', stopGame)

    const playerName: Ref<string> = ref('')
    const changePlayerName = (name) => {
      playerName.value = name
    }
    provide('playerName', readonly(playerName))
    provide('changePlayerName', changePlayerName)

    const socketId = ref('')
    provide('socketId', socketId)
    socket.on('connect', () => {
      socketId.value = socket.id
    })

    watch(start, () => {
      if (start.value) {
        game = new Phaser.Game(config)

        // get current scene
        game.events.on('changescene', (scene: Phaser.Scene) => {
          // console.log(scene)
          scene.data.set('playerName', playerName.value)
        })
      } else {
        if (game !== undefined) {
          game.destroy(true)
        }
      }
    })
    return { start }
  },
})
</script>

<style lang="sass" scoped>
#ui-base
  position: absolute
  top: 0
  left: 0
</style>
