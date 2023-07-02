<script setup lang="ts">
import dbInstall from '@/database/dbInstall'
import { addData, getDataByKey, updateDB, deleteDB } from '../database/dbHelp'
import TheWelcome from '../components/TheWelcome.vue'

const add = async () => {
  return await addData(dbInstall._db, 'focusMeta', { hours: 3, date: '2023-07-02' })
}

const get = async (id) => {
  const record = await getDataByKey(dbInstall._db, 'focusMeta', id)
  return record
}

const update = async (id) => {
  await updateDB(dbInstall._db, 'focusMeta', {
    focusId: id,
    hours: 7,
    date: '2023-07-02'
  })
}

const del = async (id) => {
  await deleteDB(dbInstall._db, 'focusMeta', id)
}

const exe = async () => {
  const id = await add()
  update(id)
  get(id)
  del(id)
}

exe();
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
