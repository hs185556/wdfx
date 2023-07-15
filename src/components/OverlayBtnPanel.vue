<template>
  <van-overlay :show="showOverlay">
    <div class="wrapper" @click="handleClickMask">
      <div class="block" @click.stop>
        <div
          class="option"
          v-for="item in overlayOptions"
          :key="item.text"
          @click="handleClick(item)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  showOverlay: { type: Boolean, default: false },
  overlayOptions: { type: Array, default: [] }
})
const emit = defineEmits(['mask-click', 'option-click'])

// 点击遮罩
const handleClickMask = () => {
  emit('mask-click')
}

// 点击选项
const handleClick = (item) => {
  // 触发从父组件传递过来的方法
  emit('option-click', item)
  handleClickMask()
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    border-radius: 2px;
    background-color: #fff;
    padding: 5px 0;
    .option {
      padding: 5px 10px;
      width: calc(100vw - 48px);
      font-size: 19px;
    }
  }
}
</style>
