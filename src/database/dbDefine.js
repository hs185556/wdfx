export default {
  dbName: 'project-meta-db', // 数据库名称
  version: 1,
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
      index: {
        parentId: false,
        type: false,
        date: false,
        status: false,
      },
      isClear: false
    },
    diaryMeta: {
      id: 'id',
      index: {
        date: false
      },
      isClear: false
    },
  }
}
