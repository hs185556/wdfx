<template>
  <div class="desire-container flexDirectionColumn">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="事件集"
      :border="false"
      style="margin-bottom: 12px"
      class="shadow-box"
    >
    </van-nav-bar>
    <div class="content flex1Column">
      <div class="list">
        <long-press
          @long-press="handleLongPressDesire(item)"
          v-for="item in desireList"
          :key="item.id"
        >
          <div class="list-item">
            {{ item.title }}
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
      @click="handleClickOption({ value: 'desireAdd' })"
    >
    </van-floating-bubble>
    <van-dialog
      v-model:show="showDialog"
      title=""
      show-cancel-button
      @confirm="handleConfirmDialog"
    >
      <div style="padding: 20px 10px">
        <van-field
          v-model="showOverlayData.title"
          label=""
          input-align="center"
          placeholder="请输入事件"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { eventBus, formatDate, objectToQueryString } from '@/utils'
import OverlayBtnPanel from '@/components/OverlayBtnPanel.vue'
import LongPress from '@/components/LongPress.vue'
import desireService from '../../service/desireService'
const router = useRouter()

// data
const desireList = ref([])

// 列表项操作
const overlayOptions = ref([])
const showOverlay = ref(false)
const showOverlayData = ref({})

// dialog
const showDialog = ref(false)

// 长按触发菜单
const handleLongPressDesire = (item) => {
  overlayOptions.value = [
    { text: '修改', value: 'desireEdit' },
    { text: '删除', value: 'desireDel' }
  ]
  showOverlayData.value = { ...item }
  showOverlay.value = true
}

// 点击遮罩按钮面板选项
const handleClickOption = (action, params?) => {
  console.log(action.value)
  switch (action.value) {
    case 'desireAdd':
      showOverlayData.value = {}
      showDialog.value = true
      break
    case 'desireEdit':
      showDialog.value = true
      break
    case 'desireDel':
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
    default:
      break
  }
}

// 添加Item
const addItem = async (val) => {
  const res = await desireService.addDesireData(val)
  if (typeof res === 'number') {
    showToast('添加成功')
    getAllDesires()
  } else {
    showToast('事件已存在')
  }
}

// 编辑Item
const editItem = async (val) => {
  const res = await desireService.updateDesireData(val)
  if (res) {
    showToast('编辑成功')
    getAllDesires()
  }
}

// 点击dialog的确认
const handleConfirmDialog = () => {
  if (showOverlayData.value.id) {
    editItem(showOverlayData.value)
  } else {
    addItem(showOverlayData.value)
  }
}

// 导航栏点击返回
const onClickLeft = () => history.back()

// 获取所有事件
const getAllDesires = async (date?) => {
  const data = await desireService.getAllDesireDataByIndexCursor()
  desireList.value = data
}

// 删除item
const deleteItem = async () => {
  const res = await desireService.deleteDesireDataByKey(showOverlayData.value.id)
  if (res) {
    showToast('删除成功')
    getAllDesires()
  }
}

onMounted(() => {
  // 隐藏底部标签
  eventBus.emit('hiddenTabbar', true)
  getAllDesires()
})

onUnmounted(() => {
  eventBus.emit('hiddenTabbar', false)
})
</script>

<style scoped lang="scss">
.desire-container {
  background: #f2f2f7;
  .content {
    background: #fff;
    overflow: auto;
    .list {
      .list-item {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>
