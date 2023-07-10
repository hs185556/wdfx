<template>
  <van-nav-bar
    :left-arrow="leftArrow"
    @click-left="onClickLeft"
    :border="false"
    :style="style"
    :class="className"
  >
    <template #title>
      <span style="font-weight: bold" @click="handleSelectAction({ text: '切换' })">{{
        selectedTheme?.name || '--'
      }}</span>
      <van-popover
        v-model:show="showThemePopover"
        :actions="themeActions"
        placement="bottom"
        theme="dark"
        @select="handleSelectAction"
      >
        <template #reference>
          <van-icon name="arrow-down" size="16" class="paddingLeftHalfRem" />
        </template>
      </van-popover>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
  <van-action-sheet
    v-model:show="showThemeList"
    :actions="themeList"
    cancel-text="取消"
    @select="handleSelectTheme"
  ></van-action-sheet>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, onActivated, computed } from 'vue'
import itemService from '../service/itemService'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { formatDate, objectToQueryString } from '@/utils'
import { showConfirmDialog, showToast } from 'vant'
const router = useRouter()

const props = defineProps({
  style: { type: String, default: '' },
  className: { type: String, default: '' },
  leftArrow: { type: Boolean, default: true }
  // showOverlay: { type: Boolean, default: false },
  // overlayOptions: { type: Array, default: [] }
})
const emit = defineEmits(['select-theme'])

// 主题操作
const selectedTheme = ref()
const showThemePopover = ref(false)
const themeActions = computed(() =>
  [
    // selectedTheme.value && { text: '切换' },
    { text: '添加' },
    selectedTheme.value && { text: '修改' },
    selectedTheme.value && { text: '删除' },
    selectedTheme.value && { text: '添加类目' }
  ].filter((v) => v)
)
const showThemeList = ref(false)
const themeList = ref([])

// 根据本地的themeId和themes设置theme
function setTheme(list) {
  let theme
  const themeId = localStorage.getItem('themeId')
  if (themeId) {
    // 遍历 themeList 数组，查找与 themeId 匹配的主题对象
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == themeId) {
        theme = list[i] // 返回匹配的主题对象
      }
    }
  }

  // 如果没有找到相应的主题对象，则返回 themeList 数组中的第一个主题对象
  theme = theme || list[0]
  theme?.id && localStorage.setItem('themeId', theme.id)

  selectedTheme.value = theme
}

// 获取全部主题
const getAllThemes = async () => {
  const themes = await itemService.getAllItemTheme()
  themeList.value = themes
  setTheme(themes)
}

// 删除item以及item下的数据
const deleteItem = async () => {
  const res = await itemService.deleteItemAndRelatedDataByKey(selectedTheme.value.id)
  if (res) {
    showToast('删除成功')
    getAllThemes()
  }
}

// 导航栏点击返回
const onClickLeft = () => history.back()

// 选择气泡弹出框选项
const handleSelectAction = (action) => {
  console.log(action.text)
  switch (action.text) {
    case '切换':
      // 如果没有主题，那么不能进行切换操作
      if (!selectedTheme.value) return
      showThemeList.value = true
      break
    case '添加':
      gotoPage('itemForm', { type: 1, title: '添加主题' })
      break
    case '修改':
      gotoPage('itemForm', {
        type: 1,
        title: selectedTheme.value?.name || '-',
        item: JSON.stringify(selectedTheme.value)
      })
      break
    case '删除':
      showConfirmDialog({
        title: `确认删除${selectedTheme.value.name}及其关联数据吗？`,
        confirmButtonColor: '#ee0a24'
      })
        .then(() => {
          deleteItem()
        })
        .catch(() => {
          // on cancel
        })
      break
    case '添加类目':
      gotoPage('itemForm', { type: 2, title: '添加类目', parentId: selectedTheme.value?.id })
      break
    default:
      break
  }
}

// 切换主题
const handleSelectTheme = (theme) => {
  console.log(theme)
  selectedTheme.value = theme
  showThemeList.value = false
  localStorage.setItem('themeId', theme.id)
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

watch(selectedTheme, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emit('select-theme', newValue)
  }
})

onMounted(() => {
  // getAllThemes()
})

onActivated(() => {
  // 重新获取数据并刷新页面
  getAllThemes()
})
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
      font-size: 17px;
    }
  }
}
</style>
