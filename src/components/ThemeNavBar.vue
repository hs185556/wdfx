<template>
  <van-nav-bar left-arrow @click-left="onClickLeft" :border="false">
    <template #title>
      <van-popover
        v-model:show="showThemePopover"
        :actions="themeActions"
        placement="bottom"
        theme="dark"
      >
        <template #reference>
          <span style="font-weight: bold" class="paddingRightHalfRem">主题1</span>
          <van-icon name="arrow-down" size="16" />
        </template>
      </van-popover>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// const props = defineProps({
//   showOverlay: { type: Boolean, default: false },
//   overlayOptions: { type: Array, default: [] }
// })
// const emit = defineEmits(['mask-click', 'option-click'])

// 主题操作
const showThemePopover = ref(false)
const themeActions = ref([
  { text: '切换' },
  { text: '添加' },
  { text: '修改' },
  { text: '删除' },
  { text: '添加类目' }
])

// 导航栏点击返回
const onClickLeft = () => history.back()
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
      font-size: 15px;
    }
  }
}
</style>
