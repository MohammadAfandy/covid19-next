import { fetchStatistic } from '../../utils/services'

export default async function handler(req, res) {
  const statistic = await fetchStatistic()
  res.status(200).json(statistic)
}
