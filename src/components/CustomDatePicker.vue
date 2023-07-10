<template>
  <div
    class="custom-date-picker-wrap"
    :style="`height: calc(100vh - ${top}px); top: ${top}px`"
    v-if="showDatePicker"
  >
    <div class="custom-date-picker-mask" @click="handleClickMask"></div>
    <div class="custom-date-picker shadow-box">
      <div class="years">
        <div
          :class="{
            year: true,
            active: pickerYear == item
          }"
          v-for="item in yearList"
          :key="item"
          @click="handleClickYear(pickerYear != item && item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="months" v-if="pickerYear">
        <div
          :class="{
            month: true,
            active: pickerMonth == item
          }"
          v-for="item in monthList"
          :key="item"
          @click="handleClickMonth(pickerMonth != item && item)"
        >
          {{ pickerYear }}/{{ item }}
        </div>
        <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>
        <i></i> <i></i>
      </div>
      <div style="margin: 8px">
        <van-button type="success" block size="normal" @click="handleClickConfirm">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { formatDate } from '@/utils'

const props = defineProps({
  top: { type: Number, default: 0 },
  showDatePicker: { type: Boolean, default: false },
  pickerDate: { type: String, default: '' }
})
const emit = defineEmits(['mask-click', 'option-click'])

const pickerYear = ref((props.pickerDate && props.pickerDate.split('-').filter((v) => v)[0]) || '')
const pickerMonth = ref((props.pickerDate && props.pickerDate.split('-').filter((v) => v)[1]) || '')

const yearList = Array.from({ length: 5 }, (_, idx) => `${new Date().getFullYear() - 4 + idx}`)
const monthList = Array.from({ length: 12 }, (_, idx) =>
  idx + 1 >= 10 ? idx + 1 + '' : `0${idx + 1}`
)

// 点击遮罩
const handleClickMask = () => {
  emit('mask-click')
}

// 点击年或月
const handleClickYear = (item) => {
  pickerYear.value = item || ''
  pickerMonth.value = item ? undefined : ''
}
const handleClickMonth = (item) => {
  pickerMonth.value = item || ''
}

// 点击确定
const handleClickConfirm = () => {
  emit('option-click', [pickerYear.value, pickerMonth.value].filter((v) => v).join('-'))
  handleClickMask()
}
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 15px;
  padding: 5px 10px;
}

.background {
  background-color: var(--van-search-content-background);
}

.active {
  background-color: var(--van-green);
  color: #fff;
}

.custom-date-picker-wrap {
  position: absolute;
  .custom-date-picker-mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    z-index: 1;
  }
  .custom-date-picker {
    background: #fff;
    color: #ada8a8;
    font-size: 15px;
    position: relative;
    top: -1px;
    height: 250px;
    overflow-x: hidden;
    z-index: 2;
    width: 100vw;
    .years {
      display: flex;
      padding: 0 8px;
      margin-bottom: 15px;
      box-sizing: content-box;
      flex-wrap: nowrap;
      overflow-x: auto;
      .year {
        flex: 1;
        margin-right: 15px;
        @extend .rounded;
        @extend .background;
        text-align: center;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          @extend .active;
        }
      }
    }
    .months {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-right: -5px;
      overflow-x: hidden;
      .month {
        text-align: center;
        width: 70px;
        padding: 8px 10px;
        margin-right: 5px;
        margin-bottom: 5px;
        @extend .background;
        &.active {
          @extend .active;
        }
      }
      /* 和month一样的宽度和margin值 */
      /* 占宽度，没有高度，超过换行也看不出来 */
      & > i {
        margin-right: 5px;
        width: 70px;
      }
    }
  }
}
</style>
