<template>
  <form class="form" @submit.prevent="submitName">
    <div class="smalltext">
      Type your <span class="hilight">playername</span> here.
    </div>
    <input
      class="textinput"
      type="text"
      name="name"
      v-model="name"
      placeholder="Player"
    />
    <input class="btn" type="submit" value="Play" />
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
      if (name.value.length <= 0) {
        alert(`Can't leave name empty.`)
        return
      }
      console.log(`form submit, player name: ${name.value}`)
      changePlayerName(name.value)
      toPage('game')
    }
    return { name, submitName }
  },
})
</script>

<style lang="sass" scoped>
@import '../style'
.form
  padding:
    top: 1em
.smalltext
  font-size: 10pt
  margin:
    bottom: 0.1em
.hilight
  color: $btn
input
  font-size: 12pt
  margin: 0.2em
  transition: all .3s ease-in-out
  &:focus
    outline: none
.textinput
  padding:
    left: 0.8em
    right: 0.8em
    top: 0.3em
    bottom: 0.3em
  border:
    width: 2px
    style: solid
    color: #ccc
    radius: 5px
  &:focus
    border:
      color: $btn-hover

.btn
  background: $btn
  color: $background
  cursor: pointer
  padding:
    left: 1.2em
    right: 1.2em
    top: 0.3em
    bottom: 0.3em
  border:
    width: 2px
    style: solid
    color: $btn-border
    radius: 5px
  &:hover
    background: $btn-hover
    border-color: $btn
  &:active
    background: $btn-border
    border-color: $btn-border
</style>
