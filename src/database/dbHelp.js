/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addData(db, storeName, data) {
    return new Promise((resolve) => {
        var request = db
            .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
            .objectStore(storeName) // 仓库对象
            .add(data);

        request.onsuccess = function (event) {
            console.log("数据写入成功");
            resolve(event.target.result)
        };

        request.onerror = function (event) {
            console.log("数据写入失败", event.target.error);
        };
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
        var transaction = db.transaction([storeName]); // 事务
        var objectStore = transaction.objectStore(storeName); // 仓库对象
        var request = objectStore.get(key); // 通过主键获取数据

        request.onerror = function (event) {
            console.log("事务失败", event.target.error);
        };

        request.onsuccess = function (event) {
            console.log("主键查询结果: ", request.result);
            resolve(request.result);
        };
    });
}

/**
* 更新数据
* @param {object} db 数据库实例
* @param {string} storeName 仓库名称
* @param {object} data 数据
*/
export function updateDB(db, storeName, data) {
    var request = db
        .transaction([storeName], "readwrite") // 事务对象
        .objectStore(storeName) // 仓库对象
        .put(data);

    request.onsuccess = function () {
        console.log("数据更新成功");
    };

    request.onerror = function (event) {
        console.log("数据更新失败", event.target.error);
    };
}

/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {number} id 主键值
 */
export function deleteDB(db, storeName, id) {
    var request = db
        .transaction([storeName], "readwrite")
        .objectStore(storeName)
        .delete(id);

    request.onsuccess = function () {
        console.log("数据删除成功");
    };

    request.onerror = function (event) {
        console.log("数据删除失败", event.target.error);
    };
}