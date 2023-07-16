<template>
  <div class="wrapper" :style="style" @click="handleClick">
    <div class="row flexJustifyBetween">
      <div class="flexJustifyStart" style="flex: 1; overflow: hidden">
        <div
          :class="{
            status: true,
            danger: item.status === 0,
            success: item.status === 1,
            primary: item.status === 2,
            marginRightHalfRem: true
          }"
        />
        <div class="title ellipsis2">{{ item.name }}</div>
      </div>
      <div class="flexColumnEnd" style="flex: 0 0 115px">
        <div class="yjTime">
          <span class="label">预计:</span
          ><span class="text blue bold">{{ item.expectedHours }}h</span>
        </div>
        <div class="sjTime" v-if="item.status !== 0">
          <span class="label">实际:</span
          ><span class="text blue bold">{{ item.actualHours }}h</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="timeRange">
        <span class="label">更新时间：</span><span class="text">{{ item.updateTime }}</span>
      </div>
    </div>
    <div class="row">
      <div class="timeRange">
        <span class="label">条目时间：</span><span class="text">{{ getTime() }}</span>
      </div>
    </div>
    <div class="row flexJustifyStart steps">
      <span class="label flexNone">条目步骤：</span
      ><span class="text ellipsis flex1">{{ item.steps }}</span>
    </div>
    <div class="row flexJustifyStart summarize" v-if="item.summary">
      <span class="label flexNone">条目总结：</span
      ><span class="text ellipsis">{{ item.summary }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { formatDate, eventBus } from '@/utils'

const props = defineProps({
  item: { type: Object, default: {} },
  style: { type: Object, default: {} }
})
const emit = defineEmits(['item-click'])

const handleClick = () => {
  emit('item-click', props.item)
}

// 获取开始时间和截止时间
function getTime() {
  const item = props.item
  const startTime = item.startTime ? formatDate(new Date(item.startTime), 'YYYY-MM-DD HH:mm') : null
  const stopTime = item.stopTime ? formatDate(new Date(item.stopTime), 'YYYY-MM-DD HH:mm') : null

  if (startTime && stopTime) {
    const startString = startTime
    const stopString = stopTime

    if (startString.substring(0, 10) === stopString.substring(0, 10)) {
      return `${startString} ~ ${stopString.substring(11)}`
    } else {
      return `${startString} - ${stopString}`
    }
  } else if (startTime) {
    return `${startTime.toLocaleString()} -`
  } else if (stopTime) {
    return `- ${stopTime.toLocaleString()}`
  } else {
    return '-'
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  border-bottom: 1px solid var(--van-cell-border-color);
  padding: 5px 0;
  .row {
    margin-bottom: 8px;
    display: flex;
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
      flex: 0 0 auto;
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
    }
    .sjTime {
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
