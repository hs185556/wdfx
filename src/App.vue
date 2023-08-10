<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { eventBus } from '@/utils'
import { ref, onMounted } from 'vue'
import { useWindowSize } from '@vant/use'
import { useRouter } from 'vue-router'
const router = useRouter()
let tabbarHeight = 54
const { width, height } = useWindowSize()
const offset = ref({ x: width.value - 48 - 24, y: height.value - 48 - tabbarHeight - 24 })
const active = ref(0)
const refresh = ref(false)
const isShowTabbar = ref(true)

// 浮动气泡拖动范围限定
const onOffsetChange = (val) => {
  if (val.y > height.value - tabbarHeight - 48 - 24) {
    val.y = height.value - tabbarHeight - 48 - 24
    offset.value = val
  }
}

// 跳转页面
const gotoPage = (url) => {
  // 在路由跳转时使用 router.go 方法将路由历史记录退回到目标路由，然后再使用 router.replace 方法替换当前路由为目标路由
  // 先注释看看，这行在pc上有问题，
  // router.go(-router.currentRoute.value.matched.length)
    router.replace(url)
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
  eventBus.on('backbutton', (tabbarIndex) => {
    active.value = tabbarIndex
  })
  // 强制刷新页面
  eventBus.on('refreshPage', () => {
    refresh.value = true
    setTimeout(() => {
      refresh.value = false
    }, 0)
  })
})
</script>

<template>
  <div class="flexDirectionColumn my-app-container">
    <!-- <van-floating-bubble
      v-model:offset="offset"
      axis="xy"
      icon="chat"
      magnetic="x"
      :gap="24"
      @offset-change="onOffsetChange"
    >
      <van-badge :content="5" dot class="bubble-badge" color="#ed6a0c">
        <van-icon name="chat" style="font-size: 28px" />
      </van-badge>
    </van-floating-bubble> -->
    <main class="flex1 my-app-main">
      <router-view v-slot="{ Component }" v-show="$route.meta?.keepAlive && !refresh">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <RouterView v-if="!$route.meta?.keepAlive && !refresh" />
    </main>
    <footer>
      <van-tabbar class="my-tabbar" v-model="active" v-if="isShowTabbar" :border="false">
        <van-tabbar-item icon="apps-o" @click="gotoPage('/')"> 应用 </van-tabbar-item>
        <van-tabbar-item icon="chart-trending-o" @click="gotoPage('/data')"> 数据 </van-tabbar-item>
        <van-tabbar-item icon="setting-o" @click="gotoPage('/mine')"> 我的 </van-tabbar-item>
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
  box-shadow: 0px -5px 5px 1px rgba(0, 19, 83, 0.15);
  position: initial;
  a {
    color: inherit;
  }
  .van-tabbar-item--active a {
    font-weight: bold;
  }
}
</style>
