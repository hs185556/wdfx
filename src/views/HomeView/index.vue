<template>
  <div class="grid-container">
    <div class="grid-item" @click="gotoPage('focus')">
      <van-icon name="service" />
      <span>专注时段</span>
    </div>
    <div class="grid-item" @click="gotoPage('item')">
      <van-icon name="gem" />
      <span>任务拆分</span>
    </div>
    <div class="grid-item" @click="gotoPage('diary')">
      <van-icon name="smile-comment" />
      <span>今日分享</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showToast } from 'vant';
const router = useRouter()

const gotoPage = (val) => {
  switch (val) {
    case 'focus':
      showToast('暂未开放');
      break
    case 'item':
      router.push('/item')
      break
    case 'diary':
      showToast('暂未开放');
      break
    default:
      break
  }
}
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.grid-item i {
  font-size: 24px;
  margin-bottom: 10px;
}

.grid-item span {
  font-size: 14px;
}
</style>
