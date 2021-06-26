import SummaryPemeriksaan from './Summary/SummaryPemeriksaan'
import SummaryVaccine from './Summary/SummaryVaccine'
import DailyVaccine from './Daily/DailyVaccine'
import Card from '../Layout/UI/Card'
import { format } from 'date-fns'

import useSWR from 'swr'
const fetcher = (url) => fetch(url).then(r => r.json())

const Vaccine = () => {
  const { data = {} } = useSWR('/api/daily_vaccine', fetcher)
  const { pemeriksaan_spesimen, pemeriksaan_orang, vaksinasi } = data
  const lastPemeriksaanSpesimen = pemeriksaan_spesimen ? pemeriksaan_spesimen.data[pemeriksaan_spesimen.data.length - 1] : null
  const lastPemeriksaanOrang = pemeriksaan_orang ? pemeriksaan_orang.data[pemeriksaan_orang.data.length - 1] : null
  const lastVaksinasi = vaksinasi ? vaksinasi.data[vaksinasi.data.length - 1] : null
  const summaryData = {
    pemeriksaan: [
      {
        key: 'spesimen',
        total_pcr_tcm: lastPemeriksaanSpesimen?.total.pcr_tcm,
        penambahan_pcr_tcm: lastPemeriksaanSpesimen?.penambahan.pcr_tcm,
        total_antigen: lastPemeriksaanSpesimen?.total.antigen,
        penambahan_antigen: lastPemeriksaanSpesimen?.penambahan.antigen,
      }, {
        key: 'orang',
        total_pcr_tcm: lastPemeriksaanOrang?.total.pcr_tcm,
        penambahan_pcr_tcm: lastPemeriksaanOrang?.penambahan.pcr_tcm,
        total_antigen: lastPemeriksaanOrang?.total.antigen,
        penambahan_antigen: lastPemeriksaanOrang?.penambahan.antigen,
      }
    ],
    vaksinasi: [
      {
        key: 'vaksinasi_1',
        total: lastVaksinasi?.total.vaksinasi_1,
        penambahan: lastVaksinasi?.penambahan.vaksinasi_1,
      }, {
        key: 'vaksinasi_2',
        total: lastVaksinasi?.total.vaksinasi_2,
        penambahan: lastVaksinasi?.penambahan.vaksinasi_2,
      }
    ],
  }
  const timestamp = pemeriksaan_spesimen ? Math.max(lastPemeriksaanSpesimen.timestamp, lastPemeriksaanOrang.timestamp, lastVaksinasi.timestamp) : null
  const lastUpdated = timestamp ? new Date(timestamp) : null

  return (
    <div className="flex flex-col">
      <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col justify-between">
        <Card className="md:col-span-2 md:mb-0 mb-2">
          <p className="text-lg">Last Updated</p>
          <p className="text-lg">{ lastUpdated ? format(lastUpdated, 'dd MMM yyyy') : '...' }</p>
        </Card>
        {summaryData.pemeriksaan.map((sum) => (
          <div key={sum.key} className="md:mb-0 mb-2">
            <SummaryPemeriksaan data={sum} />
          </div>
        ))}
        {summaryData.vaksinasi.map((sum) => (
          <div key={sum.key} className="md:mb-0 mb-2">
            <SummaryVaccine data={sum} />
          </div>
        ))}
        <div className="md:mb-0 col-span-2 mb-2">
          <DailyVaccine data={data} />
        </div>
      </div>
    </div>
  )
}

export default Vaccine
