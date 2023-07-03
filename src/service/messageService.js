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

// 根据id获取消息
const getMessageDataByKey = (key) => {
  return getDataByKey(dbInstall._db, 'messageMeta', key)
}

// 新增消息
const addMessageData = (data) => {
  return addData(dbInstall._db, 'messageMeta', data)
}

// 更新消息
const updateMessageData = (data) => {
  return updateData(dbInstall._db, 'messageMeta', data)
}

// 根据主题查询消息，按id降序排列？ (只能支持这一步了，不支持同时使用两个索引)
const getAllFocusDataByItemId = async (itemId) => {
  return getAllDataByIndexCursor(
    dbInstall._db,
    'messageMeta',
    'itemId',
    window.IDBKeyRange.only(itemId),
    'prev'
  )
}

export default {
  getMessageDataByKey,
  addMessageData,
  updateMessageData,
  getAllFocusDataByItemId
}
