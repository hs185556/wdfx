<template>
  <div class="diary-container flexDirectionColumn">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="今日分享"
      :border="false"
      style="margin-bottom: 12px"
      class="shadow-box"
    >
      <template #right>
        <van-icon name="clock-o" size="20" @click="showDatePicker = !showDatePicker" />
      </template>
    </van-nav-bar>
    <custom-date-picker
      :top="45"
      :showDatePicker="showDatePicker"
      @mask-click="showDatePicker = false"
      :pickerYear="pickerYear"
      :pickerMonth="pickerMonth"
      @option-click="setPickerDate"
    ></custom-date-picker>
    <div class="content flex1Column">
      <div class="list">
        <long-press @long-press="handleLongPressDiary">
          <div class="list-item" v-for="item in diaryList" :key="item.id" @click="gotoPage('diaryForm', {...item, type: 2})">
            <div class="title-time">
              <div class="title">{{ item.title }}</div>
              <div class="time">{{ item.date }}</div>
            </div>
            <div class="description ellipsis2">{{ item.content }}</div>
          </div>
        </long-press>
      </div>
    </div>
    <!-- 长按显示遮罩操作面板 -->
    <overlay-btn-panel
      :showOverlay="showOverlay"
      :overlayOptions="overlayOptions"
      @mask-click="showOverlay = false"
      @option-click="handleClickOption"
    />
    <van-floating-bubble
      v-model:offset="offset"
      axis="xy"
      icon="plus"
      magnetic="x"
      :gap="24"
      @click="handleClickOption({ value: 'diaryAdd' })"
    >
    </van-floating-bubble>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { eventBus, formatDate } from '@/utils'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import OverlayBtnPanel from '@/components/OverlayBtnPanel.vue'
import LongPress from '@/components/LongPress.vue'
const router = useRouter()

// 日期过滤
const pickerYear = ref(/* formatDate(new Date(), 'YYYY') */)
const pickerMonth = ref(/* formatDate(new Date(), 'MM') */)
const showDatePicker = ref(false)

const diaryList = ref([
  // {
  //   id: 1,
  //   title: '开心',
  //   content:
  //     '吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿',
  //   date: '2023-07-07'
  // },
  // { id: 2, title: '不开心', content: '吃饭没味儿', date: '2023-07-08' }
])

// 列表项操作
const showOverlay = ref(false)
const overlayOptions = ref([])

// 长按触发菜单
const handleLongPressDiary = () => {
  overlayOptions.value = [
    { text: '修改', value: 'diaryEdit' },
    { text: '删除', value: 'diaryDel' }
  ]
  showOverlay.value = true
}

// 点击遮罩按钮面板选项
const handleClickOption = (action) => {
  console.log(action.text)
  switch (action.value) {
    case 'diaryAdd':
      gotoPage('diaryForm', { type: 1, title: '添加分享' })
      break
    case 'diaryEdit':
      gotoPage('diaryForm', { type: 1, title: 'TODO' })
      break
    case 'diaryDel':
      // TODO
      break
    case 'diaryView':
      gotoPage('diaryForm', { type: 2, title: 'TODO' })
      break
    default:
      break
  }
}

// 跳转页面
const gotoPage = (val, item?) => {
  switch (val) {
    case 'diaryForm':
      const { type, title } = item
      router.push('/diaryForm?type=' + type + '&title=' + title)
      break
    default:
      break
  }
}

// 导航栏点击返回
const onClickLeft = () => history.back()

// 设置日期
const setPickerDate = ({ year, month }) => {
  year !== undefined && (pickerYear.value = year || '')
  month !== undefined && (pickerMonth.value = month || '')
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
.diary-container {
  background: #f2f2f7;
  .content {
    background: #fff;
    overflow: auto;
    .list {
      .list-item {
        padding: 10px;
        border-bottom: 1px solid #ccc;

        .title-time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;

          .title {
            font-size: 18px;
            font-weight: bold;
          }

          .time {
            font-size: 16px;
            color: #666;
          }
        }

        .description {
          font-size: 16px;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
