import { useState } from 'react'
import Card from '../Layout/UI/Card'
import Summary from './Summary/Summary'
import Select from '../Layout/UI/Select'
import Map from './Map/Map'
import Daily from './Daily/Daily'
import { format } from 'date-fns'

import useSWR from 'swr'
const fetcher = (url) => fetch(url).then(r => r.json())

const Dashboard = ({ provincesList }) => {
  const initialStateJumlah = {
    jumlah_positif: 0,
    jumlah_dirawat: 0,
    jumlah_sembuh: 0,
    jumlah_meninggal: 0,
  }
  const [selectedProvince, setSelectedProvince] = useState('')
  const summaryData = [
    { title: 'Positif', key: 'jumlah_positif' },
    { title: 'Dirawat', key: 'jumlah_dirawat' },
    { title: 'Sembuh', key: 'jumlah_sembuh' },
    { title: 'Meninggal', key: 'jumlah_meninggal' },
  ]

  const handleChangeProvince = (prov) => {
    setSelectedProvince(prov)
  }

  const { data: summary = [] } = useSWR('/api/summary', fetcher)
  const { data: dailyData = {} } = useSWR(`/api/daily?province=${selectedProvince}`, fetcher)

  let selectedData = {
    total: initialStateJumlah,
    penambahan: initialStateJumlah,
    lastUpdated: null,
  }
  if (summary.length) {
    let selectedDataProvince
    if (selectedProvince) {
      selectedDataProvince = summary.find((v) => v.province === selectedProvince.toUpperCase())
    } else {
      selectedDataProvince = summary.find((v) => v.province === 'ALL')
    }
    selectedData = {
      total: selectedDataProvince.total,
      penambahan: selectedDataProvince.penambahan,
      lastUpdated: new Date(selectedDataProvince.timestamp),
    }
  }

  return (
    <div className="flex flex-col">
      <div className="lg:grid lg:grid-cols-6 lg:gap-4 flex flex-col justify-between">
        <div className="text-sm mb-2">
          <Select
            emptyValue="SELURUH INDONESIA"
            defaultValue={selectedProvince}
            optionList={provincesList.map((v) => ({ key: v, value: v }))}
            handleChange={handleChangeProvince}
          />
          <Card>
            <p className="text-lg">Last Updated</p>
            <p className="text-lg">{ selectedData.lastUpdated ? format(selectedData.lastUpdated, 'dd MMM yyyy') : '...' }</p>
          </Card>
        </div>
        <div className="lg:col-span-4 lg:mb-0 mb-2">
          <Map
            summary={summary}
            provinces={provincesList}
            province={selectedProvince}
            handleChangeProvince={handleChangeProvince}
          />
        </div>
        <div className="lg:flex lg:flex-col lg:justify-between grid grid-cols-2 gap-2">
          <Summary summaryData={summaryData} selectedData={selectedData} />
        </div>
      </div>
      <div className="mt-5">
        <Daily dailyData={dailyData} province={selectedProvince} />
      </div>
    </div>
  )
}

export default Dashboard
