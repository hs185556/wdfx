<template>
  <div class="data-container flexDirectionColumn">
    <theme-nav-bar @select-theme="setTheme" :leftArrow="false" style="margin-bottom: 12px">
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
            <div class="text">{{ statsData?.statusOverview['1'] }}</div>
          </div>
          <div class="item">
            <div class="label">延期完成：</div>
            <div class="text">{{ statsData?.statusOverview?.['2'] }}</div>
          </div>
          <div class="item">
            <div class="label">未完成：</div>
            <div class="text">{{ statsData?.statusOverview?.['0'] }}</div>
          </div>
          <div class="item">
            <div class="label">完成百分比：</div>
            <div class="text">{{ statsData?.statusOverview?.['completeRate'] }}</div>
          </div>
        </div>
        <div class="column">
          <div class="item">
            <div class="label">总预计时长：</div>
            <div class="text">{{ statsData?.costTimeOverview?.expectedHours || '-' }}h</div>
          </div>
          <div class="item">
            <div class="label">总实际时长：</div>
            <div class="text">{{ statsData?.costTimeOverview?.actualHours || '-' }}h</div>
          </div>
        </div>
      </div>
      <h5 class="category-title">类目完成情况</h5>
      <div class="grid-item">
        <category-bar-chart :chartData="chartData" />
      </div>
      <!-- <h5 class="category-title">条目分布</h5>
      <div class="grid-item">
        <time-distribution />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import ThemeNavBar from '@/components/ThemeNavBar.vue'
import { formatDate } from '@/utils'
import CustomDatePicker from '@/components/CustomDatePicker.vue'
import CategoryBarChart from './components/CategoryBarChart.vue'
import TimeDistribution from './components/TimeDistribution.vue'
import itemService from '../../service/itemService'

const theme = ref()
const statsData = ref()
const chartData = ref([])

// 日期过滤
const pickerDate = ref(formatDate(new Date(), 'YYYY'))
const showDatePicker = ref(false)

// 设置日期
const setPickerDate = (val) => {
  pickerDate.value = val
  getAllStatsData(val)
}

// 设置主题，theme-nav-bar会初始设置一次
const setTheme = (val) => {
  theme.value = val
}

// 计算完成率
const getCompleteRate = (data) => {
  const { '0': zeroCount, '1': oneCount, '2': twoCount } = data
  const totalCount = zeroCount + oneCount + twoCount
  return totalCount !== 0 ? (((oneCount + twoCount) / totalCount) * 100).toFixed(0) : ''
}

// 查询统计数据
const getAllStatsData = async (date) => {
  if (!theme.value?.id) return
  const data = await itemService.getItemStatistics(theme.value.id, date)

  const { statusOverview } = data
  const rv = getCompleteRate(statusOverview)
  data.statusOverview['completeRate'] = rv ? rv + '%' : '-%'

  chartData.value = data.categoryOverview
    .filter((v) => v['0'] + v['1'] + v['2'] !== 0)
    .map((v) => {
      return { category: v.name, value: Number(getCompleteRate(v)) || 0 }
    })

  statsData.value = data
}

watch(theme, (newValue, oldValue) => {
  if (newValue) {
    getAllStatsData(pickerDate.value)
  } else {
    statsData.value = []
  }
})
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
      font-size: 18px;
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
            font-size: 17px;
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
