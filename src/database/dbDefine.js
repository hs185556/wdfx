export default {
    dbName: 'project-meta-db', // 数据库名称
    version: 2,
    stores: { // 数据库里的表（对象仓库）
        focusMeta: {
            id: 'focusId',
            index: {
                date: true,
            },
            isClear: true
        },
    },
}