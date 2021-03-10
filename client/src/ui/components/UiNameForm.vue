<template>
  <form @submit.prevent="submitName">
    <input
      type="text"
      name="name"
      v-model="name"
      placeholder="Type Name Here"
    />
    <input type="submit" value="Play" />
  </form>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'

export default defineComponent({
  setup() {
    const playerName: Ref<string> = inject('playerName')
    const changePlayerName = inject('changePlayerName', (name: string) => name)
    
    const name: Ref<string> = ref(playerName.value)

    const toPage = inject('toPage', (value: string) => value)

    const submitName = () => {
      console.log(`form submit, player name: ${name.value}`)
      changePlayerName(name.value)
      toPage('game')
    }
    return { name, submitName }
  },
})
</script>

<style scoped></style>
