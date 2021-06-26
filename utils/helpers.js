export const round = (value, decimal) => {
  const multiple = 10 ** decimal
  return (Math.round(value * multiple) / multiple)
}

export const generateRGBA = (opacity = 0.2) => {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  const join = `${red}, ${green}, ${blue}`
  const rgb =  `rgb(${join})`
  const rgba =  `rgba(${join}, ${opacity})`
  return [rgb, rgba]
}

export const generateRGBAMultiple = (length = 0, opacity = 0.2) => {
  const returnData = []
  for (let i = 0; i < length; i++) {
    const rgba = generateRGBA(opacity)
    returnData.push({
      rgb: rgba[0],
      rgba: rgba[1],
    })
  }
  return returnData
}