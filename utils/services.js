const BACKEND_URL = process.env.BACKEND_URL

const fetchData = async (path) => {
  const response = await fetch(`${BACKEND_URL}/${path}`)
  const data = await response.json()

  return data
}

export const fetchProvinces = async () => {
  const data = await fetchData('provinces')
  return data
}

export const fetchDaily = async (province = '') => {
  const data = await fetchData(`daily?province=${province}`)
  return data
}

export const fetchSummary = async () => {
  const data = await fetchData(`summary`)
  return data
}

export const fetchStatistic = async () => {
  const data = await fetchData(`statistic`)
  return data
}

export const fetchDailyVaccine = async () => {
  const data = await fetchData(`daily_vaccine`)
  return data
}
