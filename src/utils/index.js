export * from './date';

// 过滤indexDB的data里的空属性
export const filterData = (data) => {
  const obj = {}
  for (let key in data) {
    if (data[key] !== undefined && data[key] !== '') obj[key] = data[key]
  }
  return obj
}