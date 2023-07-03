<script setup lang="ts">
import focusService from '../service/focusService'
import itemService from '../service/itemService'
import messageService from '../service/messageService'
import diaryService from '../service/diaryService'
import TheWelcome from '../components/TheWelcome.vue'

const test = async () => {
  //   const record = await focusService.getDataByDate('2023-07-03')
  //   console.log(record)
  //   const id = await focusService.updateFocusData({
  //     id: record?.id,
  //     date: '2023-07-03',
  //     hours: 9
  //   })
  //   console.log('id', id)
  //   const list = await focusService.getAllFocusDataByDate('2023-07')
  //   debugger
  // ==========================================================
  //   const itemId = await itemService.addItemData({ test: 1 }) // 1
  //   const messageId = await messageService.addMessageData({
  //     title: '测试消息3',
  //     desc: '测试任务已经开始！3',
  //     itemId: 1,
  //     date: '2023-07-06',
  //     read: false
  //   })
  //   const message = await messageService.getMessageDataByKey(1)
  //   await messageService.updateMessageData({ ...message, read: true })
  //   const record = await messageService.getAllFocusDataByItemId(1)
  //   debugger
  // ==========================================================
  // const id = await diaryService.addDiaryData({
  //   title: '测试日记3',
  //   content: '日记内容',
  //   date: '2023-06-05'
  // })
  //   diaryService.updateDiaryData({
  //     id,
  //     title: '测试日记1',
  //     content: '日记内容1',
  //     date: '2023-07-04'
  //   })
  //   diaryService.deleteDiaryDataByKey(1)
  // const records = await diaryService.getAllDiaryDataByIndexCursor(['2023-06-01', '2023-07-04'])
  // console.log(records)
  // ==========================================================
  // const itemId = await itemService.addItemData({
  //   name: '主题3',
  //   type: 1
  // })
  // const itemId = await itemService.addItemData({ name: '分类2', parentId: 2, type: 2 })
  // const itemId = await itemService.addItemData({
  //   name: '任务1',
  //   date: '2023-07-02',
  //   expectedHours: 2,
  //   actualHours: 5,
  //   status: 2,
  //   parentId: 5,
  //   type: 3
  // })
  // const allThemes = await itemService.getAllItemTheme();
  // console.log(allThemes);
  // const items = await itemService.getAllItemsBytheme(3)
  // console.log(items);
  // const data = await itemService.getItemStatistics(3, '2023')
  // console.log(data);
}

test()
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
