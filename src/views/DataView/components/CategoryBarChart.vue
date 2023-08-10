<template>
  <div ref="chartRef" style="width: 100%; height: 200px"></div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  chartData: { type: Array, default: [] }
})

const chartRef = ref(null)

const initChart = async () => {
  await nextTick()

  const chart = echarts.init(chartRef.value)

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}: {c}%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.chartData.map((item) => item.category),
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'Percentage',
        type: 'bar',
        data: props.chartData.map((item) => item.value),
        itemStyle: {
          color: '#3fb1e3'
        }
      }
    ]
  }

  chart.setOption(options)
}

watch(
  () => props.chartData,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      initChart()
    }
  }
)

onMounted(async () => {})
</script>
