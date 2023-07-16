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
          <span>&nbsp; 专注分钟</span>
        </div>
        <div class="flexCenterCenter" style="margin-top: 12px">
          <van-stepper v-model="restValue" step="1" min="3" max="10" />
          <span>&nbsp; 休息分钟</span>
        </div>
        <van-icon name="play-circle-o" size="25" @click="startCountDown" style="margin-top: 12px" />
        <div class="tips">{{ tips1 }}</div>
      </div>
      <div v-else>
        <div style="font-size: 44px; margin-bottom: 12px; margin-bottom: 12px; font-size: 50px">
          {{ minutes }}:{{ seconds }}
        </div>
        <van-icon
          name="play-circle-o"
          size="25"
          v-if="countDownStatus === 'pause'"
          @click="recoverCountDown"
          style="margin-right: 12px"
        />
        <van-icon
          name="pause-circle-o"
          size="25"
          v-else
          @click="pauseCountDown"
          style="margin-right: 12px"
        />
        <van-icon name="revoke" size="25" @click="stopCountDown" />
        <div class="tips">{{ tips2 }}</div>
      </div>
    </div>
    <audio ref="audioRef" :src="SoundOgg"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, onActivated, onDeactivated, watch } from 'vue'
import SoundOgg from '@/assets/ogg/Potion.ogg'
import { showToast } from 'vant'
import { eventBus } from '@/utils'

/* 步骤控制 */
const step = ref(1)

/* 步骤一 */
const stepperValue = ref(60)
const restValue = ref(5)
const timeArr = computed(() => {
  const value = stepperValue.value
  const restTimes = Math.ceil(value / 30)
  const workTime = Math.floor((value - restValue.value * restTimes) / (restTimes || 1))
  return Array.from({ length: restTimes * 2 }, (_, idx) =>
    idx % 2 === 0 ? workTime : restValue.value
  )
})
const tips1 = computed(() => `你有${timeArr.value.length / 2}次休息时间`)

/* 步骤二 */
const tips2 = computed(() => {
  const even = timeIdx.value % 2 === 0
  const type = even ? '专注' : '休息'
  const nextTime = timeArr.value[timeIdx.value + 1]
  const nextType = even ? '休息' : '专注'

  let tips = `${getCurrentRound()}${type}时刻`
  tips += nextTime ? `，下一次是${nextTime}分钟的${nextType}时间` : ''

  return tips
})
const audioRef = ref(null)
// 倒计时
let intervalId // 计时器 ID
const timeIdx = ref(0)
const currentTime = ref(0) // 当前时间
const countDownStatus = ref('stop') // stop start pause
const minutes = computed(() =>
  Math.floor(currentTime.value / 60000)
    .toString()
    .padStart(2, '0')
)
const seconds = computed(() =>
  Math.floor((currentTime.value % 60000) / 1000)
    .toString()
    .padStart(2, '0')
)

// 获取当前专注回合
function getCurrentRound() {
  const round = Math.ceil((timeIdx.value + 1) / 2)
  const totalRounds = Math.ceil(timeArr.value.length / 2)
  return `现在是第${round}/${totalRounds}个`
}

/* 倒计时基础方法-S */
function start() {
  countDownStatus.value = 'start'
  clear()
  intervalId = setInterval(() => {
    if (currentTime.value > 0) {
      currentTime.value -= 1000
    } else {
      nextCountDown()
    }
  }, 1000)
}
function pause() {
  countDownStatus.value = 'pause'
  clear()
}
function reset() {
  countDownStatus.value = 'stop'
  clear()
  timeIdx.value = 0
  currentTime.value = timeArr.value[timeIdx.value] * 1000 * 60
}
function clear() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}
/* 倒计时基础方法-E */

// 导航栏点击返回
const onClickLeft = () => history.back()

// 播放提示音
const playSound = () => {
  const audio = audioRef.value
  audio.currentTime = 0 // 重置播放位置
  audio.play()
}

// 开始计时
const startCountDown = () => {
  step.value = 2
  currentTime.value = timeArr.value[timeIdx.value] * 1000 * 60
  start()
}
// 暂停计时
const pauseCountDown = () => {
  pause()
}
// 恢复计时
const recoverCountDown = () => {
  if (currentTime.value !== 0) {
    start()
  }
}
// 下一个计时
const nextCountDown = () => {
  clear()
  playSound()
  if (timeArr.value[timeIdx.value + 1]) {
    timeIdx.value += 1
    currentTime.value = timeArr.value[timeIdx.value] * 1000 * 60
    start()
  } else {
    countDownStatus.value = 'pause'
  }
}
// 结束计时
const stopCountDown = () => {
  reset()
  step.value = 1
}

var g_wakelock = null
//允许程序后台运行
function wakeLock() {
  if (!window.plus) return
  //Android
  var main = window.plus.android.runtimeMainActivity()
  var Context = window.plus.android.importClass('android.content.Context')
  var PowerManager = window.plus.android.importClass('android.os.PowerManager')
  var pm = main.getSystemService(Context.POWER_SERVICE)
  g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, 'ANY_NAME')
  g_wakelock.acquire()
  console.log('111')
}

//结束程序后台运行
function releaseWakeLock() {
  if (g_wakelock != null && g_wakelock.isHeld()) {
    g_wakelock.release()
    g_wakelock = null
  }
}

onActivated(() => {
  // 隐藏底部标签
  eventBus.emit('hiddenTabbar', true)
  // wakeLock()
})

onDeactivated(() => {
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
