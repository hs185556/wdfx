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

// 新增日记
const addDiaryData = (data) => {
  return addData(dbInstall._db, 'diaryMeta', data)
}

// 更新日记
const updateDiaryData = (data) => {
  return updateData(dbInstall._db, 'diaryMeta', data)
}

// 删除日记
const deleteDiaryDataByKey = (key) => {
  return deleteDataByKey(dbInstall._db, 'diaryMeta', key)
}

// 查询所有日记，可根据月份
const getAllDiaryDataByIndexCursor = (dateRange) => {
  let query
  if (Array.isArray(dateRange) && dateRange.length === 2) {
    query = window.IDBKeyRange.bound(dateRange[0], dateRange[1])
  }
  return getAllDataByIndexCursor(dbInstall._db, 'diaryMeta', 'date', query, 'prev')
}

export default {
  addDiaryData,
  updateDiaryData,
  deleteDiaryDataByKey,
  getAllDiaryDataByIndexCursor
}
