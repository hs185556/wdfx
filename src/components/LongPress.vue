<template>
  <div
    class="long-press"
    @mousedown.stop="startPressTimer($event)"
    @mouseup.stop="cancelPressTimer($event)"
    @mouseleave.stop="cancelPressTimer($event)"
    @touchstart.stop="startPressTimer($event)"
    @touchmove.stop="cancelPressTimer($event)"
    @touchend.stop="cancelPressTimer($event)"
  >
    <slot></slot>
    <div class="long-press-background" :class="{ show: showBackground }"></div>
  </div>
</template>

<script>
export default {
  name: 'LongPress',
  data() {
    return {
      pressTimer: null,
      showBackground: false,
      showBgTimer: null
    }
  },
  methods: {
    startPressTimer(event) {
      event.stopPropagation()

      this.showBgTimer = setTimeout(() => {
        this.showBackground = true
      }, 100)

      this.pressTimer = window.setTimeout(this.pressHandler, 800)
    },
    cancelPressTimer(event) {
      event.stopPropagation()

      window.clearTimeout(this.showBgTimer)
      this.showBackground = false

      window.clearTimeout(this.pressTimer)
    },
    pressHandler() {
      this.$emit('long-press')
    }
  }
}
</script>

<style scoped lang="scss">
.long-press {
  position: relative;
  /* 添加样式 */
  .long-press-background {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100%;
    width: 0;
    background-color: rgba(0, 0, 0, 0.07);
    transition: width 0.7s ease;
    z-index: 999;
    opacity: 0;
  }
  .long-press-background.show {
    width: 100%;
    opacity: 1;
  }
}
</style>
