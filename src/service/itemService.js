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
import { getMonthDays, formatDate, getDateRange, getDateList } from '@/utils'

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
const getAllItemsBytheme = async (id, date) => {
  const { type, range: dateRange } = getDateRange(date)
  if (type === 0) return

  let categorys = await getAllDataByIndexQuery(
    dbInstall._db,
    'itemMeta',
    'parentId',
    window.IDBKeyRange.only(id)
  )
  const customFilter = function (v) {
    const isSon = categorys.find((x) => x.id === v.parentId)
    const isInTime =
      Array.isArray(dateRange) && dateRange.length === 2
        ? v.date >= dateRange[0] && v.date <= dateRange[1]
        : true
    return isSon && isInTime
  }
  const items = await getAllDataByIndexCursor(
    dbInstall._db,
    'itemMeta',
    'type',
    window.IDBKeyRange.only(3),
    'prev',
    customFilter
  )
  return categorys.concat(items)
}

// 根据主题和时间查询统计数据
const getItemStatistics = async (id, date) => {
  const { type } = getDateRange(date)
  if (type === 0) return
  const list = getDateList(type, date)
  
  const records = await getAllItemsBytheme(id, date)

  // 总览数据
  const statusOverview = {
    0: 0, // 未完成
    1: 0, // 已完成
    2: 0 // 延期完成
  }
  const costTimeOverview = {
    expectedHours: 0, // 总预计时间, 跳过未完成
    actualHours: 0 // 实际时间, 跳过未完成
  }
  const categoryOverview = records
    .filter((v) => v.type === 2)
    .map((v) => ({
      id: v.id, // 分类id
      name: v.name, // 分类名字
      0: 0,
      1: 0,
      2: 0
    }))
  const dateStatusOverview = list.map((v) => ({ ...v, 0: 0, 1: 0, 2: 0 }))

  records.forEach((record) => {
    if (record.type !== 3) return

    statusOverview[record.status] !== undefined && (statusOverview[record.status] += 1)

    if (record.status !== 0) {
      // 跳过未完成
      costTimeOverview.expectedHours += record.expectedHours || 0
      costTimeOverview.actualHours += record.actualHours || 0
    }

    const category = categoryOverview.find((x) => x.id === record.parentId)
    if (category) {
      category[record.status] !== undefined && (category[record.status] += 1)
    }

    dateStatusOverview[
      type === 1 ? new Date(record.date).getMonth() : new Date(record.date).getDate() - 1
    ][record.status] += 1
  })

  return {
    statusOverview, // 状态总览
    costTimeOverview, // 时间总览
    categoryOverview, // 分类状态
    dateStatusOverview // 日期状态
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
