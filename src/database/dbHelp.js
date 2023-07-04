import { filterData } from '@/utils'
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addData(db, storeName, data) {
  const nData = filterData(data)
  return new Promise((resolve) => {
    var request = db
      .transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
      .objectStore(storeName) // 仓库对象
      .add(nData)

    request.onsuccess = function (event) {
      console.log('数据写入成功')
      resolve(event.target.result)
    }

    request.onerror = function (event) {
      console.log('数据写入失败', event.target.error)
    }
  })
}

/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {number} key 主键值
 */
export function getDataByKey(db, storeName, key) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([storeName]) // 事务
    var objectStore = transaction.objectStore(storeName) // 仓库对象
    var request = objectStore.get(key) // 通过主键获取数据

    request.onerror = function (event) {
      console.log('事务失败', event.target.error)
    }

    request.onsuccess = function (event) {
      console.log('主键查询结果: ', request.result)
      resolve(request.result)
    }
  })
}

/**
 * 通过索引读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
export function getDataByIndex(db, storeName, indexName, indexValue) {
  return new Promise((resolve, reject) => {
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    var request = store.index(indexName).get(indexValue)
    request.onerror = function () {
      console.log('事务失败')
    }
    request.onsuccess = function (e) {
      var result = e.target.result
      console.log('索引查询结果：', result)
      resolve(result)
    }
  })
}

/**
 * 获取所有符合索引查询条件(IDBKeyRange)的记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} index 索引名称
 * @param {Object} query 查询条件
 */
export function getAllDataByIndexQuery(db, storeName, index, query) {
  return new Promise((resolve, reject) => {
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    var indexStore = store.index(index)
    var request = indexStore.getAll(query)
    request.onerror = function () {
      console.log('事务失败')
    }
    request.onsuccess = function (e) {
      var result = e.target.result
      // console.log('索引条件查询结果：', result)
      resolve(result)
    }
  })
}

/**
 * 通过索引和游标查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} index 索引名称
 * @param {Object} query 查询条件
 * @param {string} order 排序，传prev代表降序
 */
export function getAllDataByIndexCursor(
  db,
  storeName,
  index,
  query,
  order = undefined,
  customFilter
) {
  return new Promise((resolve, reject) => {
    let list = []
    var store = db.transaction(storeName, 'readwrite').objectStore(storeName)
    var indexStore = store.index(index)
    var cursorRequest = indexStore.openCursor(query, order)
    cursorRequest.onerror = function (event) {
      console.log('事务失败', event.target.error)
    }
    cursorRequest.onsuccess = function (event) {
      var cursor = event.target.result
      // 判断游标是否还有数据
      if (cursor) {
        var data = cursor.value
        // 处理当前游标指向的数据
        if (typeof customFilter === 'function') {
          if (customFilter(data)) {
            list.push(data)
          }
        } else {
          list.push(data)
        }
        // 移动游标到下一个位置
        cursor.continue()
      } else {
        // console.log('游标索引查询结果：', list)
        resolve(list)
      }
    }
  })
}

/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
export function updateData(db, storeName, data) {
  const nData = filterData(data)
  return new Promise((resolve) => {
    var request = db
      .transaction([storeName], 'readwrite') // 事务对象
      .objectStore(storeName) // 仓库对象
      .put(nData)

    request.onsuccess = function (event) {
      console.log('数据更新成功')
      resolve(event.target.result)
    }

    request.onerror = function (event) {
      console.log('数据更新失败', event.target.error)
    }
  })
}

/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {number} id 主键值
 */
export function deleteDataByKey(db, storeName, id) {
  return new Promise((resolve) => {
    var request = db.transaction([storeName], 'readwrite').objectStore(storeName).delete(id)

    request.onsuccess = function () {
      console.log('数据删除成功')
      resolve(true)
    }

    request.onerror = function (event) {
      console.log('数据删除失败', event.target.error)
      resolve(false)
    }
  })
}
