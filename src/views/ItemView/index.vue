<template>
  <div class="item-container flexDirectionColumn">
    <theme-nav-bar>
      <template #right>
        <van-icon name="clock-o" size="20" @click="showDatePicker = !showDatePicker" />
      </template>
    </theme-nav-bar>
    <div class="filter-area shadow-box">
      <van-search v-model="searchKey" placeholder="请输入搜索关键词" />
    </div>
    <custom-date-picker
      :top="105"
      :showDatePicker="showDatePicker"
      @mask-click="showDatePicker = false"
      :pickerYear="pickerYear"
      :pickerMonth="pickerMonth"
      @option-click="setPickerDate"
    ></custom-date-picker>
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
              <item-list-item
                :item="item"
                @item-click="gotoPage('itemForm', { type: 5, title: 'TODO' })"
              ></item-list-item>
            </long-press>
          </van-collapse-item>
        </long-press>
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
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import ItemListItem from './components/ItemListItem.vue'
import { formatDate } from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()

const searchKey = ref('')
const activeNames = ref('')
// 日期过滤
const pickerYear = ref(/* formatDate(new Date(), 'YYYY') */)
const pickerMonth = ref(/* formatDate(new Date(), 'MM') */)
const showDatePicker = ref(false)
// 类目和条目操作
const showOverlay = ref(false)
const overlayOptions = ref([])

// 长按触发菜单
const handleLongPressCategory = () => {
  overlayOptions.value = [
    { text: '添加', value: 'categoryAdd' },
    { text: '修改', value: 'categoryEdit' },
    { text: '删除', value: 'categoryDel' },
    { text: '添加条目', value: 'itemAdd' }
  ]
  showOverlay.value = true
}

const handleLongPressItem = () => {
  overlayOptions.value = [
    { text: '设置为未完成', value: 'itemSet' },
    { text: '修改', value: 'itemEdit' },
    { text: '删除', value: 'itemdDel' }
  ]
  showOverlay.value = true
}

// 设置日期
const setPickerDate = ({ year, month }) => {
  year !== undefined && (pickerYear.value = year || '')
  month !== undefined && (pickerMonth.value = month || '')
}

// 点击遮罩按钮面板选项
const handleClickOption = (action) => {
  console.log(action.text)
  switch (action.value) {
    case 'categoryAdd':
      gotoPage('itemForm', { type: 2, title: '添加类目' })
      break
    case 'categoryEdit':
      gotoPage('itemForm', { type: 2, title: 'TODO' })
      break
    case 'categoryDel':
      // TODO
      break
    case 'itemAdd':
      gotoPage('itemForm', { type: 3, title: '添加条目' })
      break
    case 'itemSet':
      gotoPage('itemForm', { type: 4, title: 'TODO' })
      break
    case 'itemEdit':
      gotoPage('itemForm', { type: 3, title: 'TODO' })
      break
    case 'itemDel':
      // TODO
      break
    default:
      break
  }
}

// 跳转页面
const gotoPage = (val, item?) => {
  switch (val) {
    case 'itemForm':
      const { type, title } = item
      router.push('/itemForm?type=' + type + '&title=' + title)
      break
    default:
      break
  }
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
    position: relative;
    .van-search {
      padding-bottom: 16px;
    }
  }
  .content {
    background: #fff;
    overflow: auto;
    :deep(.van-popover__wrapper) {
      line-height: initial;
    }
    :deep(.van-collapse-item__content) {
      padding-top: 4px;
      padding-bottom: 4px;
    }
  }
}
</style>
