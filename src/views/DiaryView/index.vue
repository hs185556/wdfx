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
        <long-press
          @long-press="handleLongPressDiary(item)"
          v-for="item in diaryList"
          :key="item.id"
        >
          <div
            class="list-item"
            @click="
              gotoPage('diaryForm', { type: 2, title: item.title, item: JSON.stringify(item) })
            "
          >
            <div class="title-time">
              <div class="title ellipsis">{{ item.title }}</div>
              <div class="time" style="flex: 0 0 100px">{{ item.date }}</div>
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
import { showConfirmDialog, showToast } from 'vant'
import { eventBus, formatDate, objectToQueryString } from '@/utils'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import OverlayBtnPanel from '@/components/OverlayBtnPanel.vue'
import LongPress from '@/components/LongPress.vue'
import diaryService from '../../service/diaryService'
const router = useRouter()

// 日期过滤
const pickerYear = ref(/* formatDate(new Date(), 'YYYY') */)
const pickerMonth = ref(/* formatDate(new Date(), 'MM') */)
const showDatePicker = ref(false)

const diaryList = ref([
  // {
  //   id: 1,
  //   title: '开心开心开心开心开心开心开心开心',
  //   content:
  //     '吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿吃饭有味儿',
  //   date: '2023-07-07'
  // },
  // { id: 2, title: '不开心', content: '吃饭没味儿', date: '2023-07-08' }
])

// 列表项操作
const overlayOptions = ref([])
const showOverlay = ref(false)
const showOverlayData = ref()

// 长按触发菜单
const handleLongPressDiary = (item) => {
  overlayOptions.value = [
    { text: '修改', value: 'diaryEdit' },
    { text: '删除', value: 'diaryDel' }
  ]
  showOverlayData.value = item
  showOverlay.value = true
}

// 点击遮罩按钮面板选项
const handleClickOption = (action, params?) => {
  console.log(action.value)
  switch (action.value) {
    case 'diaryAdd':
      gotoPage('diaryForm', { type: 1, title: '添加分享' })
      break
    case 'diaryEdit':
      gotoPage('diaryForm', {
        type: 1,
        title: showOverlayData.value?.title || '-',
        item: JSON.stringify(showOverlayData.value)
      })
      break
    case 'diaryDel':
      showConfirmDialog({
        title: `确认删除${showOverlayData.value.title}吗？`,
        confirmButtonColor: '#ee0a24'
      })
        .then(() => {
          deleteItem()
        })
        .catch(() => {
          // on cancel
        })
      break
    case 'diaryView':
      gotoPage('diaryForm', { type: 2, title: 'TODO' })
      break
    default:
      break
  }
}

// 跳转页面
const gotoPage = (val, params?) => {
  switch (val) {
    case 'diaryForm':
      router.push('/diaryForm' + objectToQueryString(params))
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

// 获取所有日记，按日期降序排列
const getAllDiarys = async (date?) => {
  const data = await diaryService.getAllDiaryDataByIndexCursor()
  diaryList.value = data
}

// 删除item
const deleteItem = async () => {
  const res = await diaryService.deleteDiaryDataByKey(showOverlayData.value.id)
  if (res) {
    showToast('删除成功')
    getAllDiarys()
  }
}

onMounted(() => {
  // 隐藏底部标签
  eventBus.emit('hiddenTabbar', true)
  getAllDiarys()
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
            font-size: 20px;
            font-weight: bold;
          }

          .time {
            font-size: 18px;
            color: #666;
          }
        }

        .description {
          font-size: 18px;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
