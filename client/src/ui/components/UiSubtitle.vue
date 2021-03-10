<template>
  <h2 class="subtitle">
    <slot></slot>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ui-subtitle',
})
</script>

<style lang="sass" scoped>
.subtitle
  font-size: 18pt
  margin:
    top: 0.2em
    bottom: 0.2em
    left: 0
    right: 0
</style>
