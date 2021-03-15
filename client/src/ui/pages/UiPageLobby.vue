<template>
  <div class="ui-page-lobby fullscreen f-center">
    <div class="container">
      <ui-title>⏲</ui-title>
      <ui-title
        >You are <span class="hilight">{{ name }}</span
        >.</ui-title
      >
      <ui-subtitle>Players list</ui-subtitle>
      <div v-for="player in playerList" :key="player.id">
        <span :class="{ hilight: player.id == id }">{{ player.name }}</span>
      </div>
      <div class="control">
        <ui-btn v-if="isHost" class="btn" @click="navigate('game')"
          >Start</ui-btn
        >
        <ui-btn class="btn" type="secondary" @click="navigate('home')">
          Back
        </ui-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
import { UiTitle, UiSubtitle, UiBtn } from '../components'

import socket from '../../socket'

export default defineComponent({
  name: 'ui-lobby-page',
  components: {
    UiTitle,
    UiSubtitle,
    UiBtn,
  },
  setup() {
    const name: Ref<string> = inject('playerName')
    const id: Ref<string> = inject('socketId')
    const isHost = ref(false)

    const playerList: Ref = ref([])
    const toPage = inject('toPage', (value: string) => value)

    const navigate = (page: string) => {
      if (page == 'home') {
        socket.emit('left-lobby', {
          name: name.value,
          id: id.value,
        })
      } else if (page == 'game') {
        socket.emit('game-start', true)
      }
      toPage(page)
    }

    socket.on('game-start', (start) => {
      if (start) {
        toPage('game')
      }
    })

    socket.on('player-list', (list) => {
      isHost.value = list[0].id == id.value
      playerList.value = list
    })

    return { name, id, isHost, playerList, navigate }
  },
})
</script>

<style lang="sass" scoped>
@import '../style'

.ui-page-lobby
  background-color: $background
  color: $font

.container
  text-align: center

.control
  margin:
    top: 1em
.grey
  color: #cccccc
</style>
