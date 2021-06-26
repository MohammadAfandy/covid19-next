import { useState } from 'react'
import GenderChart from './GenderChart'
import AgeChart from './AgeChart'
import SymptompChart from './SymptompChart'
import ConditionChart from './ConditionChart'
import Card from '../Layout/UI/Card'
import { format } from 'date-fns'

import useSWR from 'swr'
const fetcher = (url) => fetch(url).then(r => r.json())

const listTab = ['Positif', 'Dirawat', 'Sembuh', 'Meninggal']

const Stats = () => {
  const { data = {} } = useSWR('/api/statistic', fetcher)
  const { data: listData, timestamp = null } = data
  const genderData = listData ? listData.jenis_kelamin : []
  const ageData = listData ? listData.kelompok_umur : []
  const symptomData = listData ? listData.gejala : []
  const conditionData = listData ? listData.kondisi_penyerta : []
  const lastUpdated = timestamp ? new Date(timestamp) : null

  return (
    <div className="flex flex-col">
      <div className="md:grid md:grid-cols-2 md:gap-4 flex flex-col justify-between">
        <Card className="md:col-span-2 md:mb-0 mb-2">
          <p className="text-lg">Last Updated</p>
          <p className="text-lg">{ lastUpdated ? format(lastUpdated, 'dd MMM yyyy') : '...' }</p>
        </Card>
        <div className="md:mb-0 mb-2">
          <GenderChart data={genderData} />
        </div>
        <div className="md:mb-0 mb-2">
          <AgeChart listTab={listTab} data={ageData} />
        </div>
        <div className="md:mb-0 mb-2">
          <SymptompChart listTab={listTab} data={symptomData} />
        </div>
        <div className="md:mb-0 mb-2">
          <ConditionChart listTab={listTab} data={conditionData} />
        </div>
      </div>
    </div>
  )
}

export default Stats
