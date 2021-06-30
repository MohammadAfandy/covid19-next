import { useState } from 'react'
import Card from '../../Layout/UI/Card'
import DailyVaccineChart from './DailyVaccineChart'
import DateFilter from '../../Layout/UI/DateFilter'
import Select from '../../Layout/UI/Select'

const DailyVaccine = ({ data }) => {
  const [startDate, setStartDate] = useState(new Date('2021/03/15'))
  const [endDate, setEndDate] = useState(new Date())
  const [category, setCategory] = useState('pemeriksaan_spesimen')
  const [type, setType] = useState('total')
  const categoryList = [
    {
      key: 'pemeriksaan_spesimen',
      value: 'Pemeriksaan Spesimen',
    },
    {
      key: 'pemeriksaan_orang',
      value: 'Pemeriksaan Orang',
    },
    {
      key: 'vaksinasi',
      value: 'Vaksinasi',
    },
  ]
  const handleTypeChange = (event) => {
    const { value } = event.target
    setType(value)
  }
  const handleCategoryChange = (cat) => {
    setCategory(cat)
  }

  const dailyData = data[category] || {}
  const chartData = dailyData.data?.filter((v) => {
    return v.timestamp >= startDate.getTime() && v.timestamp <= endDate.getTime()
  })
  return (
    <Card>
      <div className="my-3 flex flex-col">
        <h2 className=" text-2xl">Data {type === 'total' ? 'Akumulasi' : 'Per Hari'}</h2>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div className="flex justify-center mt-3 text-sm">
          <div className="hidden md:flex">
            {categoryList.map(({ key, value }) => (
              <div key={key} className="mr-2 cursor-pointer">
                <input
                  type="radio"
                  id={key}
                  name="chartCategory"
                  value={key}
                  onChange={(event) => handleCategoryChange(event.target.value)}
                  checked={category === key}
                />
                <label htmlFor={key}> {value}</label>
              </div>
            ))}
          </div>
          <Select
            className="md:hidden w-80"
            defaultValue={category}
            optionList={categoryList}
            handleChange={handleCategoryChange}
          />
        </div>
        <div className="flex md:justify-end justify-center text-sm mt-3">
          <div className="mr-2 cursor-pointer">
            <input onChange={handleTypeChange} type="radio" id="akumulasi" name="chartType" value="total" defaultChecked />
            <label htmlFor="akumulasi"> Akumulasi</label>
          </div>
          <div className="mr-2 cursor-pointer">
            <input onChange={handleTypeChange} type="radio" id="harian" name="chartType" value="penambahan" />
            <label htmlFor="harian"> Harian</label>
          </div>
        </div>
      </div>
      <DailyVaccineChart chartData={chartData} category={category} type={type} />
    </Card>
  )
}

export default DailyVaccine
