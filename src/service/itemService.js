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
import { judgeDate } from './focusService'

// 新增条目
const addItemData = (data) => {
  return addData(dbInstall._db, 'itemMeta', data)
}

// 更新条目
const updateItemData = (data) => {
  return updateData(dbInstall._db, 'itemMeta', data)
}

// 删除条目
const deleteItemDataByKey = (key) => {
  return deleteDataByKey(dbInstall._db, 'itemMeta', key)
}

// 查询所有主题
const getAllItemTheme = () => {
  return getAllDataByIndexQuery(dbInstall._db, 'itemMeta', 'type', window.IDBKeyRange.only(1))
}

// 根据主题查询所有数据
const getAllItemsBytheme = async (id, dateRange) => {
  let categorys = await getAllDataByIndexQuery(
    dbInstall._db,
    'itemMeta',
    'parentId',
    window.IDBKeyRange.only(id)
  )
  const customFilter =
    Array.isArray(dateRange) &&
    dateRange.length === 2 &&
    function (v) {
      return v.date >= dateRange[0] && v.date <= dateRange[1]
    }
  const list = []
  // TODO 有无其他方法？indexDB不支持id为[1,2,3]其中之一的查询吗？
  for (let i = 0; i < categorys.length; i++) {
    const id = categorys[i].id
    const items = await getAllDataByIndexCursor(
      dbInstall._db,
      'itemMeta',
      'parentId',
      window.IDBKeyRange.only(id),
      'prev',
      customFilter
    )
    list.push(...items)
  }
  return categorys.concat(list)
}

// 根据主题和时间查询统计数据
// TODO 理一下下述逻辑
const getItemStatistics = async (id, date) => {
  const { type, range, list } = judgeDate(date, -1)
  if (type === 0) {
    return
  }
  const records = await getAllItemsBytheme(id, range)
  // 总览数据
  const statusOverview = {
    0: 0, // 未完成
    1: 0, // 已完成
    2: 0 // 延期完成
  }
  const updateStatusOverview = (record) => {
    if (record.type !== 3) return
    switch (record.status) {
      case 0:
        statusOverview[0] += 1
        break
      case 1:
        statusOverview[1] += 1
        break
      case 2:
        statusOverview[2] += 1
        break
      default:
        break
    }
  }
  const costTimeOverview = {
    expectedHours: 0, // 总预计时间, 跳过未完成
    actualHours: 0 // 实际时间, 跳过未完成
  }
  const updateCostTimeOverview = (record) => {
    if (record.type !== 3) return
    if (record.status == 0) return // 跳过未完成
    costTimeOverview.expectedHours += record.expectedHours || 0
    costTimeOverview.actualHours += record.actualHours || 0
  }
  // 分类完成百分比
  const getCategoryPer = (id) => {
    const categoryItems = records.filter((v) => v.parentId === id)
    let finishNum = 0
    categoryItems.forEach((v) => {
      if (v.status === 1 || v.status === 2) {
        finishNum += 1
      }
    })
    return finishNum ? (finishNum / categoryItems.length).toFixed(2) : '0'
  }
  const categoryOverview = records
    .filter((v) => v.type === 2)
    .map((v) => ({
      id: v.id, // 分类id
      name: v.name, // 分类名字
      per: getCategoryPer(v.id) // 完成百分比
    }))
  // 日期状态
  const dateStatusOverview = list.map((v) => ({ ...v, 0: 0, 1: 0, 2: 0 })) // {name, value}，name格式是1月/1月1号，value的枚举是-1:无任务, 0: 未完成，1：已完成，2：延期完成
  const updateDateStatusOverview = (record) => {
    if (record.type !== 3) return
    const { date, status } = record
    if (type === 1) {
      // 年份-做月处理
      const month = new Date(date).getMonth() // month从0开始，跟下标对应，不必加一
      dateStatusOverview[month][status] += 1
    } else if (type === 2) {
      // 月份-做日处理
      const day = new Date(date).getDate() - 1 // -1对应下标
      dateStatusOverview[day][status] += 1
    }
  }
  const calcStausOverview = (list) => {
    return list.map((v) => {
      const undo = v[0];
      const done = v[1];
      const delayDone = v[2];
      if (undo + done + delayDone === 0) v.value = -1 // 无任务
      else if (undo !== 0) v.value = 0 // 未完成
      else if (undo === 0 && delayDone === 0) v.value = 1 // 已完成
      else v.value = 2 // 延期完成
      return v
    })
  }
  records.forEach((record) => {
    updateStatusOverview(record)
    updateCostTimeOverview(record)
    updateDateStatusOverview(record)
  })
  return {
    statusOverview, // 状态总览
    costTimeOverview, // 时间把握总览
    categoryOverview, // 分类完成百分比
    dateStatusOverview: calcStausOverview(dateStatusOverview) // 日期状态
  }
}

export default {
  addItemData,
  updateItemData,
  deleteItemDataByKey,
  getAllItemTheme,
  getAllItemsBytheme,
  getItemStatistics
}
