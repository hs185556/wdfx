<template>
  <div class="focus-container flexDirectionColumn">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="专注时刻"
      :border="false"
      style="margin-bottom: 12px"
      class="shadow-box"
    />
    <div class="content flex1Column flexCenterCenter">
      <div v-if="step === 1">
        <div class="flexCenterCenter">
          <van-stepper v-model="stepperValue" step="10" min="30" max="120" />
          &nbsp; 分钟 &nbsp;
          <van-icon name="play-circle-o" size="20" @click="startCountDown" />
        </div>
        <div class="tips">{{ tips1 }}</div>
      </div>
      <div v-else>
        <van-count-down
          :time="timeArr[timeIdx] * 1000 * 60"
          auto-start
          ref="countDown"
          format="mm:ss"
          @finish="nextCountDown"
          style="font-size: 42px; margin-bottom: 12px; padding: 12px 0"
        />
        <van-icon
          name="play-circle-o"
          size="20"
          v-if="countDownStatus === 'pause'"
          @click="recoverCountDown"
        />
        <van-icon
          name="pause-circle-o"
          size="20"
          v-else
          @click="pauseCountDown"
          style="margin-right: 12px"
        />
        <van-icon name="revoke" size="20" @click="stopCountDown" style="margin-right: 12px" />
        <div class="tips">{{ tips2 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { showToast } from 'vant'
import { eventBus } from '@/utils'

const step = ref(1)
const stepperValue = ref(60)

const countDown = ref(null)
const countDownStatus = ref('stop')
const timeArr = computed(() => {
  const value = stepperValue.value
  const restTimes = Math.ceil(value / 30)
  const workTime = Math.floor((value - 5 * restTimes) / (restTimes || 1))
  return Array.from({ length: restTimes * 2 }, (_, idx) => (idx % 2 === 0 ? workTime : 5))
})
const timeIdx = ref(0)

const tips1 = computed(() => `你有${timeArr.value.length / 2}次休息时间`)

function getCurrentRound() {
  const round = Math.ceil((timeIdx.value + 1) / 2)
  const totalRounds = Math.ceil(timeArr.value.length / 2)
  return `现在是第${round}/${totalRounds}个`
}

const tips2 = computed(() => {
  const even = timeIdx.value % 2 === 0
  const type = even ? '专注' : '休息'
  const nextTime = timeArr.value[timeIdx.value + 1]
  const nextType = even ? '休息' : '专注'

  let tips = `${getCurrentRound()}${type}时刻`
  tips += nextTime ? `，下一次是${nextTime}分钟的${nextType}时间` : ''

  return tips
})

// 导航栏点击返回
const onClickLeft = () => history.back()

// 开始计时
const startCountDown = () => {
  step.value = 2
  countDownStatus.value = 'start'
}
// 暂停计时
const pauseCountDown = () => {
  countDown.value.pause()
  countDownStatus.value = 'pause'
}
// 恢复计时
const recoverCountDown = () => {
  countDown.value.start()
  countDownStatus.value = 'start'
}
// 下一个计时
const nextCountDown = () => {
  if (timeArr.value[timeIdx.value + 1]) {
    timeIdx.value += 1
    countDown.value.reset()
  }
}
// 结束计时
const stopCountDown = () => {
  step.value = 1
}

onMounted(() => {
  // 隐藏底部标签
  eventBus.emit('hiddenTabbar', true)
})

onUnmounted(() => {
  eventBus.emit('hiddenTabbar', false)
})
</script>

<style scoped lang="scss">
.focus-container {
  background: #f2f2f7;
  text-align: center;
  .content {
    background: #fff;
    .tips {
      margin-top: 12px;
      color: var(--van-gray-6);
      font-size: var(--van-font-size-md);
    }
  }
}
</style>
