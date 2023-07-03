import dbInstall from '@/database/dbInstall'
import {
  addData,
  getDataByKey,
  updateData,
  deleteDataByKey,
  getDataByIndex,
  getAllDataByIndexQuery
} from '../database/dbHelp'
import { getMonthDays, formatDate } from '@/utils'

// 查询某天的专注时长
const getDataByDate = (date) => {
  return getDataByIndex(dbInstall._db, 'focusMeta', 'date', date)
}

// 修改某天的专注时长，如无则创建
const updateFocusData = (data) => {
  return updateData(dbInstall._db, 'focusMeta', data)
}

/**
 * 年份或年月的公共逻辑
 * @param {string} dateStr 日期字符串
 * @returns 类型，日期范围，初始数据
 */
const judgeDate = (dateStr) => {
  var regexYear = /^\d{4}$/ // 匹配年份格式（四位数字）
  var regexYearMonth = /^\d{4}-\d{2}$/ // 匹配年月格式（四位数字-两位数字）
  var isMatch1 = regexYear.test(dateStr)
  var isMatch2 = regexYearMonth.test(dateStr)
  const type = isMatch1 ? 1 : isMatch2 ? 2 : 0 // 类型： 0-非日期，1-年， 2-年月
  let range = [] // 日期范围
  let list = [] // 初始数据列表，年对应每个月，月对应每一天

  let year
  let month
  let maxDay
  switch (type) {
    case 1: // 年份
      year = dateStr
      range = [
        formatDate(new Date(year, 0, 1), 'YYYY-MM-DD'),
        formatDate(new Date(year, 11, 31), 'YYYY-MM-DD')
      ]
      list = new Array(12).fill(0)
      break
    case 2: // 年月
      year = new Date().getFullYear()
      month = new Date().getMonth()
      maxDay = getMonthDays(dateStr)
      range = [
        formatDate(new Date(year, month, 1), 'YYYY-MM-DD'),
        formatDate(new Date(year, month, maxDay), 'YYYY-MM-DD')
      ]
      list = new Array(maxDay).fill(0)
      break
    default:
      break
  }
  return { type, range, list }
}

// 根据年份或月份查询对应的月或日列表数据
const getAllFocusDataByDate = async (date) => {
  const { type, range, list } = judgeDate(date)
  if (type === 0) {
    return
  }
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
      list[month] += hours
    } else if (type === 2) {
      // 月份-做日处理
      const day = new Date(date).getDate() - 1 // -1对应下标
      list[day] = hours
    }
  })
  return list
}

export default {
  getDataByDate,
  updateFocusData,
  getAllFocusDataByDate
}
