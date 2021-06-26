import { fetchDailyVaccine } from '../../utils/services'

export default async function handler(req, res) {
  const dailyVaccine = await fetchDailyVaccine()
  res.status(200).json(dailyVaccine)
}
