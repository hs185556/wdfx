<template>
  <div class="item-container flexDirectionColumn">
    <theme-nav-bar>
      <template #right>
        <van-icon name="clock-o" size="20" @click="showDatePicker = true" />
      </template>
    </theme-nav-bar>
    <div class="filter-area shadow-box">
      <van-search v-model="searchKey" placeholder="请输入搜索关键词" />
      <div class="custom-date-picker" v-if="showDatePicker" @click="showDatePicker = false">
        <div class="years">
          <div class="year" v-for="item in yearList" :key="item">{{ item }}</div>
        </div>
        <div class="months">
          <div class="month" v-for="item in monthList" :key="item">{{ item }}</div>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </div>
    <div class="content flex1Column">
      <van-collapse v-model="activeNames" accordion>
        <long-press @long-press="handleLongPressCategory">
          <van-collapse-item title="标题1" name="1">
            <template #title>
              <div class="flexAlignCenter">
                <span class="paddingRightRem">标题1</span>
                <span style="font-size: 12px">40%</span>
              </div>
            </template>
            <long-press @long-press="handleLongPressItem">
              技术无非就是那些开发它的人的共同灵魂。
            </long-press>
          </van-collapse-item>
        </long-press>
        <van-collapse-item title="标题2" name="2">
          技术无非就是那些开发它的人的共同灵魂。
        </van-collapse-item>
      </van-collapse>
      <!-- 长按显示遮罩操作面板 -->
      <overlay-btn-panel
        :showOverlay="showOverlay"
        :overlayOptions="overlayOptions"
        @mask-click="showOverlay = false"
        @option-click="handleClickOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { eventBus } from '@/utils'
import { onMounted, onUnmounted, ref } from 'vue'
import ThemeNavBar from '@/components/ThemeNavBar.vue'
import LongPress from '@/components/LongPress.vue'
import OverlayBtnPanel from '@/components/OverlayBtnPanel.vue'

const searchKey = ref('')
const activeNames = ref('')
// 日期过滤
const pickerDate = ref('')
const showDatePicker = ref(false)
const fullYear = new Date().getFullYear()
const yearList = ref(new Array(5).fill(fullYear).map((v, idx) => `${v - 4 + idx}`))
const monthList = ref(
  new Array(12).fill('').map((v, idx) => `2023/${idx + 1 >= 10 ? idx + 1 : `0${idx + 1}`}`)
)
// 类目和条目操作
const showOverlay = ref(false)
const overlayOptions = ref([])

// 点击遮罩按钮面板选项
const handleClickOption = (item) => {
  console.log('>>>item', item)
}

// 长按触发菜单
const handleLongPressCategory = () => {
  overlayOptions.value = [
    { text: '添加' },
    { text: '修改' },
    { text: '删除' },
    { text: '添加条目' }
  ]
  showOverlay.value = true
}

const handleLongPressItem = () => {
  overlayOptions.value = [{ text: '添加' }, { text: '修改' }, { text: '删除' }]
  showOverlay.value = true
}

onMounted(() => {
  // 隐藏底部标签
  eventBus.emit('hiddenTabbar', true)
})

onUnmounted(() => {
  eventBus.emit('hiddenTabbar', false)
})
</script>

<style scoped lang="scss">
.item-container {
  background: #f2f2f7;
  height: 100%;
  .filter-area {
    background: #fff;
    margin-bottom: 12px;
    .van-search {
      padding-bottom: 16px;
    }
    .custom-date-picker {
      color: #ada8a8;
      font-size: 13px;
      position: relative;
      top: -5px;
      .years {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding: 0 12px;
        margin-bottom: 15px;
        .year {
          flex: 0 0 auto;
          border-radius: 15px;
          margin-right: 15px;
          padding: 2px 10px;
          background: #f9f6f6;
          &:last-child {
            margin-right: 0;
          }
          &.active {
            background: green;
            color: #fff;
          }
        }
      }
      .months {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-right: -5px;
        .month {
          text-align: center;
          width: 60px;
          padding: 2px 5px;
          margin-right: 5px;
          margin-bottom: 5px;
          background: #f9f6f6;
          &.active {
            background: green;
            color: #fff;
          }
        }
        /* 和month一样的宽度和margin值 */
        /* 占宽度，没有高度，超过换行也看不出来 */
        & > i {
          margin-right: 5px;
          width: 60px;
        }
      }
    }
  }
  .content {
    background: #fff;
    overflow: auto;
    :deep(.van-popover__wrapper) {
      line-height: initial;
    }
  }
}
</style>
