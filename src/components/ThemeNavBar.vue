<template>
  <van-nav-bar
    :left-arrow="leftArrow"
    @click-left="onClickLeft"
    :border="false"
    :style="style"
    :class="className"
  >
    <template #title>
      <van-popover
        v-model:show="showThemePopover"
        :actions="themeActions"
        placement="bottom"
        theme="dark"
        @select="handleSelectAction"
      >
        <template #reference>
          <span style="font-weight: bold" class="paddingRightHalfRem">{{ selectedTheme }}</span>
          <van-icon name="arrow-down" size="16" />
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
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  style: { type: String, default: '' },
  className: { type: String, default: '' },
  leftArrow: { type: Boolean, default: true }
  // showOverlay: { type: Boolean, default: false },
  // overlayOptions: { type: Array, default: [] }
})
// const emit = defineEmits(['mask-click', 'option-click'])

// 主题操作
const selectedTheme = ref('主题1')
const showThemePopover = ref(false)
const themeActions = ref([
  { text: '切换' },
  { text: '添加' },
  { text: '修改' },
  { text: '删除' },
  { text: '添加类目' }
])
const showThemeList = ref(false)
const themeList = ref([{ name: '主题1' }, { name: '主题2' }, { name: '主题3' }])

// 导航栏点击返回
const onClickLeft = () => history.back()

// 选择气泡弹出框选项
const handleSelectAction = (action) => {
  console.log(action.text)
  switch (action.text) {
    case '切换':
      showThemeList.value = true
      break
    case '添加':
      gotoPage('itemForm', { type: 1, title: '添加主题' })
      break
    case '修改':
      gotoPage('itemForm', { type: 1, title: selectedTheme.value })
      break
    case '删除':
      // TODO
      break
    case '添加类目':
      gotoPage('itemForm', { type: 2, title: '添加类目' })
      break
    default:
      break
  }
}

// 切换主题
const handleSelectTheme = (theme) => {
  console.log(theme)
  selectedTheme.value = theme.name
  showThemeList.value = false
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
