<template>
  <div class="custom-date-picker">
    <!-- <div class="months">
      <div
        :class="{
          month: true,
          default: index % 4 === 0,
          danger: index % 4 === 1,
          primary: index % 4 === 2,
          green: index % 4 === 3
        }"
        v-for="(item, index) in monthList"
        :key="item"
      >
        2023/{{ item }}
      </div>
      <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>
      <i></i> <i></i>
    </div> -->
    <div class="days">
      <div
        :class="{
          day: true,
          default: index % 4 === 0,
          danger: index % 4 === 1,
          primary: index % 4 === 2,
          green: index % 4 === 3
        }"
        v-for="(item, index) in dayList"
        :key="item"
      >
        7/{{ item }}
      </div>
      <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i>
      <i></i> <i></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'

const monthList = Array.from({ length: 12 }, (_, idx) =>
  idx + 1 >= 10 ? idx + 1 + '' : `0${idx + 1}`
)
const dayList = Array.from({ length: 31 }, (_, idx) =>
  idx + 1 >= 10 ? idx + 1 + '' : `0${idx + 1}`
)
</script>

<style lang="scss" scoped>
.default {
  background: var(--van-gray-2);
}
.danger {
  background: var(--van-orange);
  color: #fff;
}
.primary {
  background: var(--van-primary-color);
  color: #fff;
}
.green {
  background: var(--van-green);
  color: #fff;
}

.custom-date-picker {
  background: #fff;
  color: #ada8a8;
  font-size: 13px;
  position: relative;
  width: 100%;
  .months {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-right: -5px;
    .month {
      text-align: center;
      width: 70px;
      padding: 8px 10px;
      margin-right: 5px;
      margin-bottom: 5px;
      border-radius: 3px;
    }
    /* 和month一样的宽度和margin值 */
    /* 占宽度，没有高度，超过换行也看不出来 */
    & > i {
      margin-right: 5px;
      width: 70px;
    }
  }
  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-right: -5px;
    .day {
      text-align: center;
      width: 40px;
      padding: 4px 8px;
      margin-right: 5px;
      margin-bottom: 5px;
      border-radius: 3px;
    }
    /* 和month一样的宽度和margin值 */
    /* 占宽度，没有高度，超过换行也看不出来 */
    & > i {
      margin-right: 5px;
      width: 40px;
    }
  }
}
</style>
