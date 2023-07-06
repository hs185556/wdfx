<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { eventBus } from '@/utils'
import { ref, onMounted } from 'vue'
import { useWindowSize } from '@vant/use'
let tabbarHeight = 54
const { width, height } = useWindowSize()
const offset = ref({ x: width.value - 48 - 24, y: height.value - 48 - tabbarHeight - 24 })
const active = ref(0)
const isShowTabbar = ref(true)

// 浮动气泡拖动范围限定
const onOffsetChange = (val) => {
  if (val.y > height.value - tabbarHeight - 48 - 24) {
    val.y = height.value - tabbarHeight - 48 - 24
    offset.value = val
  }
}

onMounted(() => {
  eventBus.on('hiddenTabbar', (e) => {
    isShowTabbar.value = !e
    tabbarHeight = e ? 0 : 54
    // 如果重新显示标签栏，则检查浮动气泡位置
    if (!e) {
      onOffsetChange(offset.value)
    }
  })
})
</script>

<template>
  <div class="flexDirectionColumn my-app-container">
    <van-floating-bubble
      v-model:offset="offset"
      axis="xy"
      icon="chat"
      magnetic="x"
      :gap="24"
      @offset-change="onOffsetChange"
    >
      <van-badge :content="5" dot class="bubble-badge" color="#ed6a0c">
        <van-icon name="chat" style="font-size: 26px" />
      </van-badge>
    </van-floating-bubble>
    <main class="flex1 my-app-main">
      <RouterView />
    </main>
    <footer>
      <van-tabbar class="my-tabbar" v-model="active" v-if="isShowTabbar">
        <van-tabbar-item icon="apps-o">
          <RouterLink to="/">应用</RouterLink>
        </van-tabbar-item>
        <van-tabbar-item icon="chart-trending-o">
          <RouterLink to="/data">数据</RouterLink>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          <RouterLink to="/mine">我的</RouterLink>
        </van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<style scoped lang="scss">
// 浮动气泡
.bubble-badge {
  :deep(.van-badge--top-right) {
    top: 5px !important;
    right: 4px !important;
  }
}
// 标签栏
.my-tabbar {
  box-shadow: 0px -1px 10px 1px rgba(0, 19, 83, 0.15);
  position: initial;
  a {
    color: inherit;
  }
  .van-tabbar-item--active a {
    font-weight: bold;
  }
}
</style>
