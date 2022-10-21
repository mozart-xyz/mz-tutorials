export const getApiKey = () => {
  for (const param of process.argv) {
    const isApiKey = checkIsApiKey(param)
    if (isApiKey) {
      const apiKey = param.slice(10)
      return apiKey
    }
  }
  return ""
}

const checkIsApiKey = (param) => {
  if (param.length < 10) {
    return false
  }
  const expected = '--api-key='
  const header = param.slice(0, expected.length)
  if (header != expected) {
    return false
  }
  return true
}

