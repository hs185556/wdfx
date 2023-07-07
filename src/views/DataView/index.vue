<template>
  <div class="data-container flexDirectionColumn">
    <theme-nav-bar style="margin-bottom: 12px" className="shadow-box">
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
        </div>
        <div class="column">
          <div class="item">
            <div class="label">完成百分比：</div>
            <div class="text">70%</div>
          </div>
          <div class="item">
            <div class="label">总预计时长：</div>
            <div class="text">100h</div>
          </div>
          <div class="item">
            <div class="label">总实际时长：</div>
            <div class="text">200h</div>
          </div>
        </div>
      </div>
      <h5 class="category-title">类目完成情况</h5>
      <div class="grid-item">
        <category-bar-chart />
      </div>
      <h5 class="category-title">
        时段分布
        <div class="legends">
          <div class="legend gray">
            <div class="color-block"></div>
            <div class="text">无任务</div>
          </div>
          <div class="legend red">
            <div class="color-block"></div>
            <div class="text">未完成</div>
          </div>
          <div class="legend green">
            <div class="color-block"></div>
            <div class="text">已完成</div>
          </div>
          <div class="legend blue">
            <div class="color-block"></div>
            <div class="text">延期完成</div>
          </div>
        </div>
      </h5>
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
    .legends {
      position: absolute;
      left: 100%;
      top: 0;
      transform: translateX(-100%);
      display: flex;
      .legend {
        position: relative;
        height: 22px; // 图例的高度
        margin-right: 12px; // 每个图例之间的间距
        display: flex;
        align-items: center;
        &:last-child {
          margin-right: 0;
        }
        .color-block {
          width: 20px; // 颜色块的宽度
          border-radius: 3px;
          height: 10px;
        }

        .text {
          padding-left: 3px; // 文字和颜色块之间的间距
          font-size: 10px;
          white-space: nowrap;
        }
        &.gray .color-block {
          background-color: var(--van-gray-2);
        }

        &.red .color-block {
          background-color: var(--van-orange);
        }

        &.green .color-block {
          background-color: var(--van-green);
        }

        &.blue .color-block {
          background-color: var(--van-primary-color);
        }
      }
    }
  }
}
</style>
