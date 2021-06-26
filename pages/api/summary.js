import { fetchSummary } from '../../utils/services'

export default async function handler(req, res) {
  const summary = await fetchSummary()
  res.status(200).json(summary)
}
