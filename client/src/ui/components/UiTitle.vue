<template>
  <h1 class="title">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ui-title',
})
</script>

<style lang="sass" scoped>
.title
  font-size: 38pt
  margin:
    top: 0.2em
    bottom: 0.2em
    left: 0
    right: 0
</style>