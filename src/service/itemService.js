import dbInstall from '@/database/dbInstall'
import {
  addData,
  getDataByKey,
  updateData,
  deleteDataByKey,
  getDataByIndex,
  getAllDataByIndexQuery,
  getAllDataByIndexCursor
} from '../database/dbHelp'
// import { getMonthDays, formatDate } from '@/utils'

// 新增条目
const addItemData = (data) => {
  return addData(dbInstall._db, 'itemMeta', data)
}

// 更新条目
const updateItemData = (data) => {
  return updateData(dbInstall._db, 'itemMeta', data)
}

export default {
  addItemData,
  updateItemData
}
