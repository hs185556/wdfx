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

// 新增事件
const addDesireData = (data) => {
  return addData(dbInstall._db, 'desireMeta', data)
}

// 更新事件
const updateDesireData = (data) => {
  return updateData(dbInstall._db, 'desireMeta', data)
}

// 删除事件
const deleteDesireDataByKey = (key) => {
  return deleteDataByKey(dbInstall._db, 'desireMeta', key)
}

// 查询所有事件
const getAllDesireDataByIndexCursor = () => {
  return getAllDataByIndexQuery(dbInstall._db, 'desireMeta')
}

export default {
  addDesireData,
  updateDesireData,
  deleteDesireDataByKey,
  getAllDesireDataByIndexCursor
}
