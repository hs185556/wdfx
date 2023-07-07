<template>
  <div class="wrapper" :style="style" @click="handleClick">
    <div class="row flexJustifyBetween">
      <div class="flexJustifyStart">
        <div class="status primary marginRightHalfRem" />
        <div class="title">这是个伟大的条目</div>
      </div>
      <div class="flexJustifyEnd">
        <div class="yjTime" style="margin-right: 8px">
          <span class="label">预计：</span><span class="text blue bold">10h</span>
        </div>
        <div class="sjTime">
          <span class="label">实际：</span><span class="text blue bold">20h</span>
        </div>
      </div>
    </div>
    <div class="row flexJustifyBetween">
      <div class="timeRange">
        <span class="label">条目时间：</span><span class="text">2023-7-7 11:40~18:30</span>
      </div>
      <div class="timeRange">
        <span class="label">最后更新：</span><span class="text">2023-7-7 18:30</span>
      </div>
    </div>
    <div class="row flexJustifyStart steps">
      <span class="label flexNone">条目步骤：</span
      ><span class="text ellipsis flex1"
        >这是一个任务步骤，把大象放进冰箱里要几步，很简单只要三步，第一步打开冰箱门，第二步把大象塞进去，第三步关闭冰箱门，就完成了啦啦啦啦很简单对吧</span
      >
    </div>
    <div class="row flexJustifyStart summarize">
      <span class="label flexNone">条目总结：</span
      ><span class="text ellipsis"
        >我严重低估了大象的价格、重量和高估了冰箱的体积。我严重低估了大象的价格、重量和高估了冰箱的体积。我严重低估了大象的价格、重量和高估了冰箱的体积</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  item: { type: Object, default: {} },
  style: { type: Object, default: {} }
})
const emit = defineEmits(['item-click'])

const handleClick = () => {
  emit('item-click', props.item)
}
</script>

<style scoped lang="scss">
.wrapper {
  border-bottom: 1px solid #c0c4cc;
  margin: 5px 0;
  .row {
    margin-bottom: 8px;
    // 基础组装型样式
    .label {
      font-size: var(--van-font-size-sm);
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
    }
    .text {
      font-size: var(--van-font-size-sm);
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #666666;
    }
    .blue {
      color: var(--van-blue);
    }
    .bold {
      font-size: var(--van-font-size-md);
    }
    //
    .status {
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background: var(--van-gray-6);
      &.danger {
        background: var(--van-gradient-red);
      }
      &.success {
        background: var(--van-green);
      }
      &.primary {
        background: var(--van-blue);
      }
    }
    .title {
      font-size: var(--van-font-size-xl);
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      font-weight: bold;
      color: #222222;
    }
    .yjTime {
      margin-right: 8px;
    }
    .sjTime {
      margin-right: 8px;
    }
    .timeRange {
    }
    .steps {
    }
    .summarize {
    }
  }
}
</style>
