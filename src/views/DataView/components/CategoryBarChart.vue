<template>
  <div ref="chartRef" style="width: 100%; height: 200px;"></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';

const chartData = [
  { category: 'A', value: 0.2 },
  { category: 'B', value: 0.4 },
  { category: 'C', value: 0.6 },
  { category: 'D', value: 0.8 },
];

const chartRef = ref(null);

onMounted(async () => {
  await nextTick();

  const chart = echarts.init(chartRef.value);

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
      top: "10%",
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.category),
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
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [{
      name: 'Percentage',
      type: 'bar',
      data: chartData.map(item => item.value * 100),
      itemStyle: {
        color: '#3fb1e3'
      }
    }]
  };

  chart.setOption(options);
});

</script>