<script setup lang="ts">
import focusService from '../service/focusService'
import TheWelcome from '../components/TheWelcome.vue'

const test = async () => {
  // const record = await focusService.getDataByDate('2023-07-03')
  // console.log(record)
  // const id = await focusService.updateFocusData({
  //   id: record?.id,
  //   date: '2023-07-03',
  //   hours: 9
  // })
  // console.log('id', id)
  const list = await focusService.getAllFocusDataByDate(
    "2023-07"
  )
  debugger
}

test()
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
