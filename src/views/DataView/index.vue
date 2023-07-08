<template>
  <div class="data-container flexDirectionColumn">
    <theme-nav-bar style="margin-bottom: 12px" className="shadow-box" :leftArrow="false">
      <template #right>
        <van-icon name="clock-o" size="20" @click="showDatePicker = !showDatePicker" />
      </template>
    </theme-nav-bar>
    <custom-date-picker
      :top="45"
      :showDatePicker="showDatePicker"
      @mask-click="showDatePicker = false"
      :pickerYear="pickerYear"
      :pickerMonth="pickerMonth"
      @option-click="setPickerDate"
    ></custom-date-picker>
    <div class="content flex1Column">
      <h5 class="category-title">数据概览</h5>
      <div class="grid-item">
        <div class="column">
          <div class="item">
            <div class="label">已完成：</div>
            <div class="text">3</div>
          </div>
          <div class="item">
            <div class="label">延期完成：</div>
            <div class="text">2</div>
          </div>
          <div class="item">
            <div class="label">未完成：</div>
            <div class="text">2</div>
          </div>
          <div class="item">
            <div class="label">完成百分比：</div>
            <div class="text">70%</div>
          </div>
        </div>
        <div class="column">
          <div class="item">
            <div class="label">总预计时长：</div>
            <div class="text">100h</div>
          </div>
          <div class="item">
            <div class="label">总实际时长：</div>
            <div class="text">200h</div>
          </div>
          <div class="item">
            <div class="label">总专注时长：</div>
            <div class="text">30h</div>
          </div>
        </div>
      </div>
      <h5 class="category-title">类目完成情况</h5>
      <div class="grid-item">
        <category-bar-chart />
      </div>
      <h5 class="category-title">条目分布</h5>
      <div class="grid-item">
        <time-distribution />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ThemeNavBar from '@/components/ThemeNavBar.vue'
import { formatDate } from '@/utils'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import CategoryBarChart from './components/CategoryBarChart.vue'
import TimeDistribution from './components/TimeDistribution.vue'

// 日期过滤
const pickerYear = ref(formatDate(new Date(), 'YYYY'))
const pickerMonth = ref(formatDate(new Date(), 'MM'))
const showDatePicker = ref(false)

// 设置日期
const setPickerDate = ({ year, month }) => {
  year !== undefined && (pickerYear.value = year || '')
  month !== undefined && (pickerMonth.value = month || '')
}
</script>

<style scoped lang="scss">
.data-container {
  background: #f2f2f7;
  height: 100%;
  .content {
    background: #fff;
    overflow: auto;
    padding: 0 12px;
    .category-title {
      position: relative;
      margin: 12px 12px 12px 0;
      font-weight: 400;
      font-size: 14px;
      color: var(--van-gray-6);
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 2em;
        height: 2px;
        background-color: var(--van-gray-6);
        transform: translateY(50%);
      }
    }
    .grid-item {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      .column {
        width: 48%;
        .item {
          margin-bottom: 4px;
          display: flex;
          &:last-child {
            margin-bottom: 0;
          }
          .label,
          .text {
            display: block;
            text-align: left;
            font-size: 13px;
          }
          .label {
            color: var(--van-gray-6);
          }
          .text {
            color: var(--van-gray-7);
          }
        }
      }
    }
  }
}
</style>
