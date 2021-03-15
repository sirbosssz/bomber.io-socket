<template>
  <div
    class="btn"
    :class="{ primary: type == 'primary', secondary: type == 'secondary' }"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ui-btn',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
})
</script>

<style lang="sass" scoped>
@import '../style'

.btn
  display: inline-block
  min-width: 4em
  -webkit-appearance: none
  cursor: pointer
  margin:
    left: 0.2em
    right: 0.2em
  padding:
    left: 1.2em
    right: 1.2em
    top: 0.1em
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
.primary
  background: $btn
  color: $background
  border:
    color: $btn-border
  &:hover
    background: $btn-hover
    border-color: $btn
  &:active
    background: $btn-border
    border-color: $btn-border
.secondary
  background: $background
  color: $btn
  border:
    color: $btn
  &:hover
    background: $background
    border-color: $btn-hover
  &:active
    background: $background
    border-color: $btn-border
</style>
