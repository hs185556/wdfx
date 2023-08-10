// 判断是否是无效日期
export function isValidDate(date) {
  return date instanceof Date && isNaN(date.getTime())
}

// 获取月份最大天数
export function getMonthDays(dateStr) {
  // 创建一个表示当前日期的 Date 对象
  var currentDate = new Date(dateStr)
  // 获取当前月份
  var currentMonth = currentDate.getMonth()
  // 获取当前年份
  var currentYear = currentDate.getFullYear()
  // 根据当前年份和月份创建一个新的 Date 对象
  var firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  // 将月份设置为下一个月
  firstDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1)
  // 将日期设置为0，表示上一个月的最后一天
  firstDayOfMonth.setDate(0)
  // 获取最大天数
  return firstDayOfMonth.getDate()
}

export const formatDate = (date, str) => {
  // 创建 Date 对象
  var date = date || new Date()
  // 获取年、月、日、小时、分钟和秒
  var year = date.getFullYear()
  var month = date.getMonth() + 1 // 月份从 0 开始，需要加 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  // 定义格式对应数值
  var YYYY = year
  var MM = month < 10 ? '0' + month : month
  var DD = day < 10 ? '0' + day : day
  var HH = hours < 10 ? '0' + hours : hours
  var mm = minutes < 10 ? '0' + minutes : minutes
  var ss = seconds < 10 ? '0' + seconds : seconds
  // 格式化为指定格式
  var formattedDate = str.replace('YYYY', YYYY)
    .replace('MM', MM)
    .replace('DD', DD)
    .replace('HH', HH)
    .replace('mm', mm)
    .replace('ss', ss)
  // console.log(formattedDate) // 输出格式化后的日期
  return formattedDate
}

// 返回日期范围
export const getDateRange = (dateStr) => {
  const year = new Date(dateStr).getFullYear()
  const month = new Date(dateStr).getMonth()
  // 0:非日期；1:年；2:年月
  const type = /^\d{4}$/.test(dateStr) ? 1 : /^\d{4}-\d{2}$/.test(dateStr) ? 2 : 0
  // 日期范围
  const range =
    type === 1
      ? [
          formatDate(new Date(dateStr, 0, 1), 'YYYY-MM-DD'),
          formatDate(new Date(dateStr, 11, 31), 'YYYY-MM-DD')
        ]
      : type === 2
      ? [
          formatDate(new Date(year, month, 1), 'YYYY-MM-DD'),
          formatDate(new Date(year, month, getMonthDays(dateStr)), 'YYYY-MM-DD')
        ]
      : []
  return { type, range }
}

// 获取日期初始数据列表
export const getDateList = (type, dateStr, defaultVal = 0) => {
  const month = new Date(dateStr).getMonth()
  return type === 1
    ? new Array(12).fill(0).map((v, index) => ({ name: `${index + 1}月`, value: defaultVal }))
    : type === 2
    ? new Array(getMonthDays(dateStr)).fill(0).map((v, index) => ({
        name: `${month + 1}月${index + 1}号`,
        value: defaultVal
      }))
    : []
}
