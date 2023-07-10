<template>
  <div
    class="long-press"
    @mousedown.stop="startPressTimer($event)"
    @touchstart.stop="startPressTimer($event)"
    @mouseup.stop="cancelPressTimer($event)"
    @mouseleave.stop="cancelPressTimer($event)"
    @touchend.stop="cancelPressTimer($event)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LongPress',
  data() {
    return {
      pressTimer: null
    }
  },
  methods: {
    startPressTimer(event) {
      event.stopPropagation()
      this.pressTimer = window.setTimeout(this.pressHandler, 500)
    },
    cancelPressTimer(event) {
      event.stopPropagation()
      window.clearTimeout(this.pressTimer)
    },
    pressHandler() {
      this.$emit('long-press')
    }
  }
}
</script>

<style scoped>
.long-press {
  /* 添加样式 */
}
</style>
