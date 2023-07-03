<script setup lang="ts">
import focusService from '../service/focusService'
import itemService from '../service/itemService'
import messageService from '../service/messageService'
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
  // const list = await focusService.getAllFocusDataByDate(
  //   "2023-07"
  // )
  // debugger

  // const itemId = await itemService.addItemData({test: 1}); // 1
  // const messageId = await messageService.addMessageData({
  //   title: "测试消息3",
  //   desc: "测试任务已经开始！3",
  //   itemId: 1,
  //   date: '2023-07-06',
  //   read: false,
  // })
  // const message = await messageService.getMessageDataByKey(1);
  // await messageService.updateMessageData({...message, read: true})
  const record = await messageService.getAllFocusDataByItemId(1);
  debugger;
}

test()
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
