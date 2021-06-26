import { fetchDaily } from '../../utils/services'

export default async function handler(req, res) {
  const { province = '' } = req.query
  const daily = await fetchDaily(province)
  res.status(200).json(daily)
}
