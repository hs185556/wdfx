export default {
  dbName: 'project-meta-db', // 数据库名称
  version: 3,
  stores: {
    // 数据库里的表（对象仓库）
    focusMeta: {
      id: 'id',
      index: {
        date: true
      },
      isClear: false
    },
    messageMeta: {
      id: 'id',
      index: {
        itemId: false
      },
      isClear: false
    },
    itemMeta: {
      id: 'id',
      index: {},
      isClear: true
    },
    diaryMeta: {
      id: 'id',
      index: {
        date: false
      },
      isClear: true
    },
  }
}
