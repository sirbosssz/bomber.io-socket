<template>
  <div>Text: {{ text }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'phaser'
import { config } from '../game/index'

export default defineComponent({
  setup() {
    const text: string = 'Hello World'
    let start: boolean = false

    if (start) {
      new Phaser.Game(config)
    }
    return { text }
  },
})
</script>

<style scoped></style>
