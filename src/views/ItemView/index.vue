<template>
  <div class="item-container flexDirectionColumn">
    <theme-nav-bar @select-theme="setTheme">
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
      :pickerDate="pickerDate"
      @option-click="setPickerDate"
    ></custom-date-picker>
    <div class="content flex1Column">
      <van-collapse v-model="activeNames" accordion>
        <long-press
          @long-press="handleLongPressCategory(item)"
          v-for="item in itemTreeData"
          :key="item.id"
        >
          <van-collapse-item :name="item.name">
            <template #title>
              <div class="flexAlignCenter">
                <span class="paddingRightRem">{{ item.name }}（{{ item.children.length }}）</span>
                <span style="font-size: 14px">{{ getCompletionRate(item.children) }}</span>
              </div>
            </template>
            <long-press
              @long-press="handleLongPressItem(item1)"
              v-for="(item1, index) in item.children"
              :key="item1.id"
            >
              <item-list-item
                v-if="!searchKey || item1.name.includes(searchKey)"
                :item="item1"
                @item-click="
                  gotoPage('itemForm', { type: 5, title: item1.name, item: JSON.stringify(item1) })
                "
                :style="index === item.children.length - 1 ? 'border-bottom: 0' : ''"
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
import { onMounted, onUnmounted, ref, onActivated, onDeactivated, watch } from 'vue'
import ThemeNavBar from '@/components/ThemeNavBar.vue'
import LongPress from '@/components/LongPress.vue'
import OverlayBtnPanel from '@/components/OverlayBtnPanel.vue'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import ItemListItem from './components/ItemListItem.vue'
import { formatDate, objectToQueryString } from '@/utils'
import { showConfirmDialog, showToast } from 'vant'
import itemService from '../../service/itemService'
import { useRouter } from 'vue-router'
const router = useRouter()

const theme = ref()
const searchKey = ref('')
const activeNames = ref()
// 日期过滤
const pickerDate = ref(/* formatDate(new Date(), 'YYYY-MM') */)
const showDatePicker = ref(false)
// 类目和条目操作
const itemTreeData = ref([])
const showOverlay = ref(false)
const showOverlayData = ref()
const overlayOptions = ref([])

// 获取完成度
function getCompletionRate(list) {
  if (list.length === 0) {
    return '-%'
  }

  // 计算已完成的任务数
  const completedCount = list.reduce((acc, item) => {
    return acc + (item.status === 1 || item.status === 2 ? 1 : 0)
  }, 0)

  // 计算完成率并将其格式化为字符串
  const completionRate = ((completedCount / list.length) * 100).toFixed(0)
  return `${completionRate}%`
}

// 设置主题，theme-nav-bar会初始设置一次
const setTheme = (val) => {
  theme.value = val
}

// 长按触发菜单
const handleLongPressCategory = (item) => {
  overlayOptions.value = [
    // { text: '添加', value: 'categoryAdd' },
    { text: '修改', value: 'categoryEdit' },
    { text: '删除', value: 'categoryDel' },
    { text: '添加条目', value: 'itemAdd' }
  ]
  showOverlayData.value = item
  showOverlay.value = true
}

const handleLongPressItem = (item) => {
  overlayOptions.value = [
    { text: item.status === 0 ? '设置为已完成' : '设置为未完成', value: 'itemSet' },
    { text: '修改', value: 'itemEdit' },
    { text: '删除', value: 'itemDel' }
  ]
  showOverlayData.value = item
  showOverlay.value = true
}

// 设置日期
const setPickerDate = (val) => {
  pickerDate.value = val;
  getAllThemeItems(val)
}

// 删除item以及item下的数据
const deleteItem = async () => {
  const res = await itemService.deleteItemAndRelatedDataByKey(showOverlayData.value.id)
  if (res) {
    showToast('删除成功')
    getAllThemeItems()
  }
}

// 点击遮罩按钮面板选项
const handleClickOption = (action, params?) => {
  console.log(action.text)
  switch (action.value) {
    case 'categoryAdd':
      gotoPage('itemForm', { type: 2, title: '添加类目', parentId: showOverlayData.value?.id })
      break
    case 'categoryEdit':
      gotoPage('itemForm', {
        type: 2,
        title: showOverlayData.value?.name || '-',
        item: JSON.stringify(showOverlayData.value)
      })
      break
    case 'categoryDel':
      showConfirmDialog({
        title: `确认删除${showOverlayData.value.name}及其关联数据吗？`,
        confirmButtonColor: '#ee0a24'
      })
        .then(() => {
          deleteItem()
        })
        .catch(() => {
          // on cancel
        })
      break
    case 'itemAdd':
      gotoPage('itemForm', { type: 3, title: '添加条目', parentId: showOverlayData.value?.id })
      break
    case 'itemSet':
      gotoPage('itemForm', {
        type: 4,
        title: showOverlayData.value?.name || '-',
        item: JSON.stringify(showOverlayData.value)
      })
      break
    case 'itemEdit':
      gotoPage('itemForm', {
        type: 3,
        title: showOverlayData.value?.name || '-',
        item: JSON.stringify(showOverlayData.value)
      })
      break
    case 'itemDel':
      showConfirmDialog({
        title: `确认删除${showOverlayData.value.name}及其关联数据吗？`,
        confirmButtonColor: '#ee0a24'
      })
        .then(() => {
          deleteItem()
        })
        .catch(() => {
          // on cancel
        })
      break
    default:
      break
  }
}

// 跳转页面
const gotoPage = (val, params?) => {
  switch (val) {
    case 'itemForm':
      router.push('/itemForm' + objectToQueryString(params))
      break
    default:
      break
  }
}

// 列表数据转成树结构数据
function listToTree(list) {
  const map = new Map()
  const roots = []

  // 将所有节点的id和对应节点的映射存放到Map中
  for (const node of list) {
    node.children = []
    map.set(node.id, node)
    if (node.type === 2) {
      roots.push(node)
    }
  }

  // 遍历所有节点，将节点添加到其父节点的children属性中
  for (const node of list) {
    const parent = map.get(node.parentId)
    if (parent) {
      parent.children.push(node)
    }
  }

  return roots
}

// 获取所有主题条目，转化成二维数组？，并进行排序：按最后更新时间降序排列
const getAllThemeItems = async (date?) => {
  if (!theme.value?.id) return
  const items = await itemService.getAllItemsBytheme(theme.value.id, date)
  itemTreeData.value = listToTree(items)
}

watch(theme, (newValue, oldValue) => {
  if (newValue) {
    getAllThemeItems()
  } else {
    itemTreeData.value = []
  }
})

onActivated(() => {
  // 隐藏底部标签
  setTimeout(() => {
    eventBus.emit('hiddenTabbar', true)
  }, 0)
})

onDeactivated(() => {
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
      padding-top: 0px;
      padding-bottom: 0px;
    }
    :deep(.van-hairline--top-bottom:after) {
      border-width: 0;
    }
    // :deep(.van-collapse-item__title--expanded:after) {
    // display: none;
    // }
  }
}
</style>
