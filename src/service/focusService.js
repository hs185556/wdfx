import dbInstall from '@/database/dbInstall'
import {
  addData,
  getDataByKey,
  updateData,
  deleteDataByKey,
  getDataByIndex,
  getAllDataByIndexQuery
} from '../database/dbHelp'
import { getMonthDays, formatDate, getDateRange, getDateList } from '@/utils'

// 查询某天的专注时长
const getDataByDate = (date) => {
  return getDataByIndex(dbInstall._db, 'focusMeta', 'date', date)
}

// 修改某天的专注时长，如无则创建
const updateFocusData = (data) => {
  return updateData(dbInstall._db, 'focusMeta', data)
}

// 根据年份或月份查询对应的月或日列表数据
const getAllFocusDataByDate = async (date) => {
  const { type, range } = getDateRange(date)
  if (type === 0) return
  const list = getDateList(type, date)

  const records = await getAllDataByIndexQuery(
    dbInstall._db,
    'focusMeta',
    'date',
    window.IDBKeyRange.bound(range[0], range[1])
  )
  records.forEach((v) => {
    const { date, hours } = v
    if (type === 1) {
      // 年份-做月处理
      const month = new Date(date).getMonth() // month从0开始，跟下标对应，不必加一
      list[month].value += hours
    } else if (type === 2) {
      // 月份-做日处理
      const day = new Date(date).getDate() - 1 // -1对应下标
      list[day].value = hours
    }
  })
  return list
}

export default {
  getDataByDate,
  updateFocusData,
  getAllFocusDataByDate
}
