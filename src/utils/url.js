export function objectToQueryString(params) {
  const queryStrings = []

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key]
      const encodedValue = encodeURIComponent(value)
      const encodedKey = encodeURIComponent(key)
      queryStrings.push(`${encodedKey}=${encodedValue}`)
    }
  }

  return (queryStrings.length ? '?' : '') + queryStrings.join('&')
}
