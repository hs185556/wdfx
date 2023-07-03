import dbDefine from './dbDefine'

export default {
  _db: {}, // 访问数据库的实例
  install() {
    return new Promise((resolve, reject) => {
      //  兼容浏览器
      window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
      var indexedDB =
        window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
      let db
      // 打开数据库，若没有则会创建
      const request = indexedDB.open(dbDefine.dbName, dbDefine.version)
      // 数据库打开成功回调
      request.onsuccess = (event) => {
        db = event.target.result // 数据库对象
        console.log('数据库打开成功')
        this._db = db
        resolve(db)
      }
      // 数据库打开失败的回调
      request.onerror = (event) => {
        console.log('数据库打开报错', event.target.error)
      }
      // 数据库有更新时候的回调
      request.onupgradeneeded = (event) => {
        // 数据库创建或升级的时候会触发
        console.log('onupgradeneeded')
        db = event.target.result // 数据库对象
        for (const key in dbDefine.stores) {
          const store = dbDefine.stores[key]
          if (db.objectStoreNames.contains(key)) {
            // 已经有仓库，验证一下是否需要删除原来的仓库
            if (store.isClear) {
              // 删除原对象仓库
              db.deleteObjectStore(key)
              // 创建存储库
              var objectStore = db.createObjectStore(key, {
                keyPath: store.id, // 这是主键
                autoIncrement: true // 实现自增
              })
              // 创建索引，在后面查询数据的时候可以根据索引查
              for (const key2 in store.index) {
                const unique = store.index[key2]
                objectStore.createIndex(key2, key2, { unique: unique })
              }
            }
          } else {
            // 创建存储库
            var objectStore = db.createObjectStore(key, {
              keyPath: store.id, // 这是主键
              autoIncrement: true // 实现自增
            })
            // 创建索引，在后面查询数据的时候可以根据索引查
            for (const key2 in store.index) {
              const unique = store.index[key2]
              objectStore.createIndex(key2, key2, { unique: unique })
            }
          }
        }
      }
    })
  }
}
